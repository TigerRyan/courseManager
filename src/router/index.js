import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: {
                        title: '自定义图标'
                    }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: {
                        title: '基础表格'
                    }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: {
                        title: 'tab选项卡'
                    }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: {
                        title: '基本表单'
                    }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: {
                        title: 'schart图表'
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: {
                        title: '拖拽列表'
                    }
                },

                {
                    // 班级管理
                    path: '/grade',
                    component: resolve => require(['../components/page/GradeManager.vue'], resolve),
                    meta: {
                        title: '班级管理'
                    }
                },{
                    // 教室管理
                    path: '/classroom',
                    component: resolve => require(['../components/page/ClassroomManager.vue'], resolve),
                    meta: {
                        title: '教室管理'
                    }
                },{
                    path: '/course',
                    component: resolve => require(['../components/page/CourseManager.vue'], resolve),
                    meta: {
                        title: '课程管理'
                    }
                },
                //教师管理
                {
                    path: '/title',
                    component: resolve => require(['../components/page/TitleManager.vue'], resolve),
                    meta: {
                        title: '职称管理'
                    }
                }, {
                    path: '/organization',
                    component: resolve => require(['../components/page/Organization.vue'], resolve),
                    meta: {
                        title: '组织架构'
                    }
                },

                {
                    // 学生管理组件
                    path: '/student',
                    component: resolve => require(['../components/page/StudentManager.vue'], resolve),
                    meta: {
                        title: '学生管理'
                    }
                },


                {
                    // 选课任务管理
                    path: '/task',
                    component: resolve => require(['../components/page/TaskManager.vue'], resolve),
                    meta: {
                        title: '选课任务管理'
                    }
                },

                {
                    // 选课对比分析
                    path: '/analysis',
                    component: resolve => require(['../components/page/AnalysisManager.vue'], resolve),
                    meta: {
                        title: '选课对比分析'
                    }
                }, {
                    // 选师任务管理
                    path: '/chooseTeacher',
                    component: resolve => require(['../components/page/ChooseTeacherManager.vue'], resolve),
                    meta: {
                        title: '选师任务管理'
                    }
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: {
                        title: '权限测试',
                        permission: true
                    }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: {
                        title: '403'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
