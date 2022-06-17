# 10W+知乎用户可视化方案开发文档

## References

- [北京大学开放研究数据平台](https://opendata.pku.edu.cn/dataverse/pku)
- http://wurui.cc/zhihu/
- https://github.com/KEN-LJQ/ZhihuSpider
- https://www.jianshu.com/p/962bc581e03a
- Echarts 示例：https://echarts.apache.org/examples/zh/index.html

## 数据集

> [北京大学开放研究数据平台](https://opendata.pku.edu.cn/dataverse/pku)

数据量：`100018`。

### 字段

> https://github.com/KEN-LJQ/ZhihuSpider
>
> > 本数据集应该是在上述爬虫的基础上修改后爬取而来。

| 字段           | 含义                             | 类型 |
| -------------- | -------------------------------- | -------------- |
| url_token          | 用户标识字段                     | string |
| name       | 用户昵称                         | string |
| avatar_url     | 用户头像URL                      | string |
| user_type          | 用户类别                     | string |
| headline       | 用户的个性签名                 | string |
| description    | 用户描述                         | string |
| business       | 所在行业                         | {…} |
| locations      | 居住地                           | [{…}, {…}, …] |
| employments    | 工作经历                         | [{…}, {…}, …] |
| educations     | 教育经历                         | [{…}, {…}, …] |
| gender         | 性别（男1，女-1，未知0）              | int(-1, 0 ,1) |
| favorited_count | 该用户的被收藏数         | int |
| thanked_count | 该用户的被感谢数         | int |
| following_count | 该用户正在关注的用户数目         | int |
| follower_count  | 关注该用户的用户数目             | int |
| answer_count    | 该用户回答的问题的数目           | int |
| articles_count    | 该用户撰写的文章的数目           | int |
| question_count  | 该用户提问的问题数目             | int |
| voteup_count    | 该用户获得赞的数目               | int |

## 主要技术

- 可视化工具
  - D3.js
    - d3-tip.js
  - Echarts.js
    - Echarts-wordcloud.js
  - Grid.js
- 前端
  - *HTML + CSS + JavaScript*
  - [Layerui.js](https://layui.itze.cn/)
- 后端
  - *Python + Java JDK*
  - Elasticsearch
    - IK 中文分词器
  - Flask
    - Flask-CORS
  - pm2
- 哈希路由技术
  - 实现单个 HTML 文件浏览多页面的功能

## 数据清洗



## 基本可视化

### 用户分布地理位置可视化

首先根据 `locations`：地区字段的信息，对用户分类，然后在全国地图上绘制散点图（或气泡图）。使用颜色通道的深浅来表征用户密度。

### 用户教育程度、职业背景可视化

主要探索以下的列：

- `educations`：教育背景
- `employments`：职业背景
- `business`：所属领域

这些列都属于具有子结构的列。并且，一个用户可以有多个教育背景、职业背景。

主要通过条形图、词云等方式来进行可视化。并且可以对其进行少量分类后，在地理位置上通过不同颜色来进行标识。

### 用户社交统计可视化

主要对以下的数值型数据进行可视化：

- `gender`：性别
- `answer_count`：回答数
- `articles_count`：文章数
- `voteup_count`：获赞数
- `thanked_count`：感谢数
- `favorited_count`：收藏数
- `follower_count`：被关注数
- `following_count`：关注数

可以使用柱状图、折线图对排序后的结果进行展示。按数值区间划分后也可以用饼图展示等。支持一定的筛选功能。

### 用户描述词频统计

主要是对文本型字段进行处理。首先对用户的 `headline`：签名、`description`：个人描述字段进行分词，然后去除停用词，最后进行可视化。

同时支持筛选，比如：按地理位置、按教育程度筛选。

## 基础数据分析

> 按照 [https://www.jianshu.com/p/962bc581e03a](https://www.jianshu.com/p/962bc581e03a) 的思路复现。

- 知乎用户职业背景
- 知乎用户所属领域
- 知乎用户教育程度分析
- 知乎用户地域分布分析
- 知乎用户性别比例分析
- 知乎用户数值活跃度分析
- ……

## 交叉特征分析

交叉特征指多个特征混合形成的特征。

## 异常特征分析



## 数据探索（动态）

数据探索页面主要提供关键词搜索功能，用户给出关键词，向 Elasticsearch 搜索引擎所在的服务器提交查询请求，服务器返回查询结果（不超过1000条相关文档）。

前端获取查询结果后，渲染成 Grid.js 形式的表格，高亮关键词。

查询结果可视为基于某个主题的小批量数据集，因而可以进一步做动态可视化。

### TF-IDF 热门词表 & 词频统计词云

显示最有代表性的词汇。

### 地理位置分布



### 用户画像（弹出层）

如何计算用户之间的相似度？可在用户画像页面推荐相似用户。



## 源代码

### 后端

#### 建立索引

```

```

