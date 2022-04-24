class Documentation {
  constructor () {}
  create_documentation_at(element_id){
    open_loading_preview();

    document.getElementById(element_id).innerHTML = `
    <div style="padding-left: 15vw; padding-right: 15vw;">
          <h1>【数据集介绍】10W+知乎用户数据集</h1>
          <h2>一、技术背景</h2>
          <p>你好！</p>
          <p>知乎平台是一个中文互联网的常用知识问答社区，其中用户的活跃程度分布、地理位置分布等等都值得进行数据分析和可视化。随着互联网社交的快速发展，出现了类似知乎治校的戏称，这反映了知乎正在成为主流年轻人发表、获取知识的重要途径之一。无论是提供舆情方向指导还是研究社群分布情况，知乎数据集都有价值。</p>
          <h2>二、数据来源</h2>
          <p>此次提案以2019年北京大学开放研究数据平台提供的<b>10W+知乎用户数据集</b>（中等规模）作为数据基础。</p>
          <p><span>数据来源于</span><a href="https://opendata.pku.edu.cn/dataverse/pku"><span>北京大学开放研究数据平台</span></a><span>。</span></p>
          <blockquote><p><span>姚, 若愚, 2019, </span>“<span>10W+知乎用户数据集</span>”<span>, </span><a href="https://doi.org/10.18170/DVN/XLRXFR" target="_blank" class="url">https://doi.org/10.18170/DVN/XLRXFR</a><span>, 北京大学开放研究数据平台, V1</span></p></blockquote>
          <p><span>数据格式为单个json文件。数据集共有10万条用户数据。一个典型的用户数据如下：</span></p>
          <p><img src="img/typical-user-data.png" referrerpolicy="no-referrer" alt="image-typical-user-data"></p>
          <p><span>数据包含了以下内容：</span></p>
          <ul><li><code>name</code><span>：昵称</span></li><li><code>url_token</code><span>：用户识别码</span></li><li><code>user_type</code><span>：用户类型</span></li><li><code>avatar_url</code><span>：头像链接</span></li><li><code>business</code><span>：所属领域</span></li><li><code>description</code><span>：个人描述</span></li><li><code>educations</code><span>：教育背景</span></li><li><code>employments</code><span>：职业背景</span></li><li><code>gender</code><span>：性别</span></li><li><code>headline</code><span>：签名</span></li><li><code>locations</code><span>：地区</span></li><li><code>answer_count</code><span>：回答数</span></li><li><code>articles_count</code><span>：文章数</span></li><li><code>voteup_count</code><span>：获赞数</span></li><li><code>thanked_count</code><span>：感谢数</span></li><li><code>favorited_count</code><span>：收藏数</span></li><li><code>follower_count</code><span>：被关注数</span></li><li><code>following_count</code><span>：关注数</span></li></ul>
        </div>
    `;
    
    close_loading_preview();
  }
}