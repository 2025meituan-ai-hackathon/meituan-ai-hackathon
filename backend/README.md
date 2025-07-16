
这是一个美团2025 ai黑客松的项目


# 前端

运行

```bash
pnpm install
pnpm start
```

打开链接。

# 后端

加了一个bmain.py，用来测试接口。

main.py/bmain.py都可以用uv来管理。

我的做法：
```bash
uv venv
source .venv/bin/activate # 根据自己的shell选择
uv pip install -r requirements.txt
uv run uvicorn main:app --host 127.0.0.1 --port 8000
```

如果用bmain.py启动的话可以用如下curl命令来看测试结果：
```bash
 curl -X POST "http://127.0.0.1:8000/answer_v2" \
        -H "Content-Type: application/json" \
        -d '{
      "query": "你好，请介绍一下这个地方",
      "city": {
        "name": "北京市",
        "latitude": 39.9042,
        "longitude": 116.4074
      },
      "is_first_request": true
    }'
```

main.py里面的接口如果按照前端逻辑，应该用query路径传参但是能力有限没跑起来。。。

# env文件

对于前端/后端，都需要使用到friday的appkey。

后端的.env可以这样写：
```env
OPENAI_API_KEY=your_key
AMAP_KEY=your_key
```


注意，OPENAI\_KEY都是friday提供的，不要用dpsk或者OpenAI提供的。

目前对前端代码有一些修改，需要看看怎么个事。
