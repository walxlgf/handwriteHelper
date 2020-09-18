### 准备工作
1. 进入工作目录
        
        cd ../../MainWs/handwriteHelper
2. 安装依赖  
    
        npm install 
### 步骤
1. 根据原始数据(***origin.txt***)生成***list.json***。

        node main
    > ***list.json*** 相当于数据库，第一次**node main**时新建，一旦新建完成，再次执行**node main**只是更新其中的数据。
2. 从***list.json***随机出指定个数的对象到***random.json***中
        
        node random -c 50 
        或
        node random --count 50
    > *-c 20* 和 *--count 20* 是随机的个数

    > ***random.json***是生成的结果，也是下一步**设置熟练度**的**参数文件**
3. 设置熟练度
   
        node family
    > 用户直接修改***random.json***中对象的**family**属性

    > 以***random.json***为参数文件
    
    > 设置的结果保存在***list.json***中