<template>
<div class="list">
    <h1>用户列表</h1>
    <el-table :data="list">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="$router.push(`/resume/edit/${scope.row._id}`)">编辑</el-button>
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
            const res = await this.$http.get('rest/resume')
            this.list = res.data
        },
        async remove(row) {
            this.$confirm(
                `是否删除用户“${row.name}”?`,
                '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                console.log(row._id)
                const res = await this.$http.delete(`rest/resume/${row._id}`)// eslint-disable-line no-unused-vars
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
