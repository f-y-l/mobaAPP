<template>
<div class="list">
    <h1>物品列表</h1>
    <el-table :data="list">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column prop="icon" label="图标">
            <template slot-scope="scope">
                <img :src="scope.row.icon" alt="" height="100" width="100">
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
                <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            list: [{}]
        }
    },
    methods: {
        async getList() {
            const res = await this.$http.get('rest/items')
            this.list = res.data
        },
        async remove(row) {
            this.$confirm(
                `是否删除物品“${row.name}”?`,
                '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                console.log(row._id)
                const res = await this.$http.delete(`rest/items/${row._id}`)// eslint-disable-line no-unused-vars
                this.$message({
                        type: 'success',
                        message: '删除成功!'
                    },
                    this.getList());
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created() {
        this.getList()
    }
}
</script>
<style>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>