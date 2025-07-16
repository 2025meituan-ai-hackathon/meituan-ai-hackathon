from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from agent import CityWalkAgent, CityWalkResponse
import os
import sys

# 加载环境变量
load_dotenv()

# 检查必要的环境变量
required_env_vars = ["OPENAI_API_KEY", "AMAP_KEY"]
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    print(f"错误: 缺少必要的环境变量: {', '.join(missing_vars)}")
    print("请在 .env 文件中设置这些变量")
    sys.exit(1)
else:
    print("AMAP_KEY", os.getenv("AMAP_KEY"))
    print("OPENAI_API_KEY", os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = CityWalkAgent()

class Landmark(BaseModel):
    name: str
    latitude: float
    longitude: float

class City(BaseModel):
    name: str
    latitude: float
    longitude: float

class MetaData(BaseModel):
    city: City
    is_first_request: bool

# 方案1：修改为纯POST请求（推荐）
@app.post("/answer", response_model=CityWalkResponse)
async def answer(metadata: MetaData, query: str = Query(...)) -> CityWalkResponse:
    """
    调用CityWalkAgent回答问题
    """
    try:
        if metadata.is_first_request:
            agent.conversation_reset()
        return agent.answer(query, metadata, metadata.is_first_request)
    except Exception as e:
        print(f"Error talking to agent: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))  # 修改这里，使用raise

# 方案2：或者创建一个请求体模型
class AnswerRequest(BaseModel):
    query: str
    city: City
    is_first_request: bool

@app.post("/answer_v2", response_model=CityWalkResponse)
async def answer_v2(request: AnswerRequest) -> CityWalkResponse:
    """
    调用CityWalkAgent回答问题（版本2）
    """
    try:
        metadata = MetaData(city=request.city, is_first_request=request.is_first_request)
        if request.is_first_request:
            agent.conversation_reset()
        return agent.answer(request.query, metadata, request.is_first_request)
    except Exception as e:
        print(f"Error talking to agent: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 添加健康检查端点
@app.get("/")
async def root():
    return {"message": "CityWalk API is running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

