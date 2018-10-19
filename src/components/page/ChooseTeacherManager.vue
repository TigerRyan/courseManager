<template>
    <div class="chooseTeacherManager">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-circle-check-outline"></i> 选师任务管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row type="flex" class="handle-box" justify="start">
                <div>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del mr10" @click="handleCreate">新增选师任务</el-button>
                    <span class="pdl10">年级:</span>
                    <el-select v-model="select_grade" placeholder="请选择" class="handle-select mr10">
                        <el-option key="1" label="高一" value="1"></el-option>
                        <el-option key="2" label="高二" value="2"></el-option>
                    </el-select>
                    <span class="pdl10">任务进度:</span>
                    <el-select v-model="select_class" placeholder="请选择" class="handle-select mr10">
                        <el-option key="1" label="未开始" value="1"></el-option>
                        <el-option key="2" label="已结束" value="2"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    <el-button icon="el-icon-refresh" @click="search">重置</el-button>
                </div>
            </el-row>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column align="center" prop="studentId" label="任务编号" min-width="120">
                </el-table-column>
                <el-table-column align="center" prop="name" label="任务名称" width="120">
                </el-table-column>
                <el-table-column align="center" prop="date" label="开始时间" min-width="150">
                </el-table-column>
                <el-table-column align="center" prop="date" label="结束时间" min-width="150">
                </el-table-column>
                <el-table-column prop="grade" label="选科年级">
                    <template slot-scope="scope">
                        {{gradeFilter[scope.row.grade]}}
                    </template>
                </el-table-column>
                <el-table-column prop="class" label="选科班级">
                    <template slot-scope="scope">
                        {{classFilter[scope.row.class]}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="studentId" label="学生人数" min-width="120" />
                <el-table-column align="center" prop="studentId" label="任务进度" min-width="120" />
                <el-table-column label="操作" class="handle" width="250" align="right">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.name==='何静'" type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-view" @click="handleEdit(scope.$index, scope.row)">查看统计</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="form.tip" :visible.sync="form.editVisible" width="30%">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="学生学号" prop="studentId">
                    <el-input v-model.number="form.studentId" :min="0" placeholder="请输入学生学号"></el-input>
                    <!-- <el-input v-model="form.name"></el-input> -->
                </el-form-item>
                <el-form-item label="学生姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入学生姓名,不超过20个字符"></el-input>
                </el-form-item>
                <!-- value-format="yyyy-MM-dd" -->
                <el-form-item label="出生日期" prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="学生性别" prop="gender">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="所在年级">
                    <el-select v-model="gradeFilter[form.grade]" placeholder="请选择所在年级">
                        <el-option v-for="item in gradeOptions" :key="item.grade" :label="item.itemName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在班级">
                    <el-select v-model="classFilter[form.classId]" placeholder="请选择所在班级">
                        <el-option v-for="item in classOptions" :key="item.class" :label="item.itemName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码重置">
                    <el-checkbox v-model="form.checked">将密码重置为 123456</el-checkbox>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="form.editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { list } from './../../constant/student'
export default {
    name: 'chooseTeacherManager',
    data() {
        return {
            rules: {
                name: [
                    { required: true, trigger: 'blur', message: '姓名不能为空' },
                    { pattern: /^([\u4e00-\u9fa5]{2,10})$/, message: '长度在2到10位中文字符', trigger: 'blur' }
                ],
                studentId: [
                    { required: true, message: '学号不能为空...', trigger: 'blur' },
                    { pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
                grade: [{ required: true, message: '请选择活动年级', trigger: 'change' }],
                class: [{ required: true, message: '请选择活动班级', trigger: 'change' }]
            },
            // 后期开发有用
            tableData: [],
            form: {
                name: '',
                date: '',
                studentId: null,
                editVisible: false,
                editable: false,
                tip: '新增学生',
                checked: true,
                grade: null,
            },
            gradeOptions: [
                { grade: 1, itemName: '高一' },
                { grade: 2, itemName: '高二' },
                { grade: 3, itemName: '高三' }
            ],
            classOptions: [
                { class: 1, itemName: '一班' },
                { class: 2, itemName: '二班' },
                { class: 3, itemName: '三班' }
            ],
            gradeFilter: ['高一', '高二', '高三'],
            classFilter: ['一班', '二班', '三班'],
            // date: "1997-11-11",
            // name: "林2丽",
            // address: "吉林省 辽源市 龙山区",
            // studentId: 102393029,
            // gender: 1,
            // grade: '高一',
            // class: '2班',
            // classTeacher: '武田美',
            url: './static/vuetable.json',

            cur_page: 1,
            multipleSelection: [],
            select_grade: '',
            select_class: '',
            select_cate: '',
            select_word: '',
            del_list: [],
            delVisible: false,

            idx: -1
        }
    },
    created() {
        this.getData();
    },
    computed: {
        data() {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.name === this.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.address.indexOf(this.select_cate) > -1 &&
                        (d.name.indexOf(this.select_word) > -1 ||
                            d.address.indexOf(this.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            })
        }
    },
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            // if (process.env.NODE_ENV === 'development') {
            //     this.url = '/ms/table/list';
            // };
            // this.$axios.post(this.url, {
            //     page: this.cur_page
            // }).then((res) => {
            //     this.tableData = res.data.list;
            // })
            this.tableData = list
        },
        search() {
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleCreate() {
            this.form = {
                name: '',
                date: '',
                studentId: null,
                editable: false,
                tip: '新增学生',
                checked: true,
                grade: null,
                editVisible: true
            }
        },
        handleEdit(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                ...this.form,
                editable: true,
                tip: '编辑学生',
                ...item
            }
            console.log(' this.form:', this.form)
            this.form.editVisible = true;
        },
        handleDelete(index, row) {
            this.idx = index;
            this.delVisible = true;
        },
        delAll() {
            const length = this.multipleSelection.length;
            let str = '';
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error('删除了' + str);
            this.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 保存编辑
        saveEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$set(this.tableData, this.idx, this.form);
                    this.form.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        // 确定删除
        deleteRow() {
            this.tableData.splice(this.idx, 1);
            this.$message.success('删除成功');
            this.delVisible = false;
        }
    }
}

</script>
<style lang='less' scoped>
.pdl10 {
  padding-left: 10px;
}
.handle-box {
  min-width: 1158px;
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 150px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.studentManager {
  width: 100%;
  font-size: 14px;
  overflow: hidden;
}
.red {
  color: #ff0000;
}
</style>
<style  lang='less'>
.chooseTeacherManager {
  span {
    font-size: 14px;
  }
  .el-dialog__header {
    font-size: 18px;
    background-color: #eee;
    .el-dialog__title {
      color: #333;
      letter-spacing: 2px;
    }
    // margin-bottom: 10px;
  }
  .is-right > .cell {
    padding-right: 40px;
  }
  .el-table th.is-right {
    text-indent: 20px;
    text-align: center;
  }
}
</style>
