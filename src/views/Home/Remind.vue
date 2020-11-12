<template>
    <div class="remind">
        <child-nav :title="title"></child-nav>
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" @change="screenChange1" />
            <van-dropdown-item v-model="value2" :options="option2" @change="screenChange2" />
        </van-dropdown-menu>
        <van-list v-model="loading" :finished="finished" :offset="offset" finished-text="没有更多了" @load="onLoad">
            <div ref="box">
                <div v-for="(item, index) in recent_contact" :key="index" class="latest_tasks">
                    <ul>
                        <li style="font-weight: 550">{{ item.typeName }}</li>
                        <li class="set_up" @click="updateStatus(item)">
                            {{ item.status == 1 ? '设为已读' : item.status == 2 ? '设为未读' : '' }}
                        </li>
                        <li>{{ item.createdTime | transform }}</li>
                    </ul>
                    <ul>
                        <li>{{ item.content }}</li>
                    </ul>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script>
import ChildNav from '../../components/Public/ChildNav';
import { Dialog, Toast, List } from 'vant';
import 'vant/lib/index.css';

export default {
    name: 'Remind',
    components: {
        ChildNav,
    },
    data() {
        return {
            title: '提醒',
            recent_contact: [],
            value1: '0',
            value2: '0',
            option1: [],
            option2: [],
            offset: 0, //滚动条与底部距离小于 offset 时触发load事件，默认300
            pageNo: 1, // 当前页码
            pageSize: 10, // 分页大小
            total: 0, // 查询总条数
            loading: false, // 滚动加载中
            finished: false, // 滚动加载完成
            charityData: [],
            throttleTime: {
                nowTime: 0,
                lastTime: 0,
            },
        };
    },
    created() {
        this.dic_nation();
    },
    methods: {
        queryTask() {
            return new Promise((resolve, reject) => {
                let params = {
                    userName: localStorage.getItem('username'),
                    page: this.pageNo,
                    limit: this.pageSize,
                    ...this.filterData
                };
                this.$httpGet({
                    url: '/api/userMessage/query',
                    params: params,
                })
                    .then((res) => {
                        console.log(res);
                        if (res.data.length > 0) {
                            console.log(1111);
                            let result = {
                                total: res.count,
                                pageIndex: 1,
                                recent_contact: res.data,
                            };
                            resolve(result);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        // 滚动加载更多
        onLoad() {
            // debugger
            this.loading = true;
            this.queryTask().then((res) => {
                console.log(res);
                this.recent_contact = this.recent_contact.concat(res.recent_contact);
                // debugger
                console.log(this.recent_contact.length);
                if (this.recent_contact.length >= res.total) {
                    this.finished = true;
                } else {
                    this.finished = false;
                    this.pageNo = this.pageNo + 1;
                }
                this.loading = false;
            });
        },
        alert(msg) {
            this.$toast.showToast({
                msg: msg,
                duration: 2000,
            });
        },
        dic_nation() {
            this.$httpGet({
                url: '/dic/type/dic_message_type',
            }).then((res) => {
                let transformDara = [];
                res.data.forEach((it, index) => {
                    if (it.parentId !== null) {
                        transformDara.push({ value: it.code, text: it.codeText });
                    }
                });
                this.option1 = transformDara;
            });
            this.$httpGet({
                url: '/dic/type/dic_message_status',
            }).then((res) => {
                let transformDara = [];
                res.data.forEach((it, index) => {
                    if (it.parentId !== null) {
                        transformDara.push({ value: it.code, text: it.codeText });
                    }
                });
                this.option2 = transformDara;
            });
        },
        screenChange1(val) {
            this.filterData = {
                ...this.filterData,
                type: val,
                page: 1
            }

            this.queryTask().then(res => {
                this.recent_contact = res.recent_contact;
                this.finished = false;
                this.pageNo = 1;
            })
        },
        screenChange2(val) {
               this.filterData = {
                ...this.filterData,
                status: val,
                page: 1
            }

            this.queryTask().then(res => {
                this.recent_contact = res.recent_contact;
                this.finished = false;
                this.pageNo = 1;
            })
        },
        updateStatus(item) {
            this.throttleTime.nowTime = new Date().getTime();
            if (this.throttleTime.nowTime - this.throttleTime.lastTime > 2000) {
                this.throttleTime.lastTime = this.throttleTime.nowTime;
                this.$httpPut({
                    url: '/api/userMessage/updateMessageStatus',
                    params: {
                        messageId: item.id,
                    },
                }).then((res) => {
                    if (res.code == 400) {
                        Toast({
                            message: res.resultMessage,
                            position: 'middle',
                        });
                    } else {
                        this.queryTask();
                        item.status = item.status === 1 ? 2 : 1;
                        Toast({
                            message: res.resultMessage,
                            position: 'middle',
                        });
                    }
                });
            }
        },
    },
};
</script>
<style scoped>
.remind {
    padding-top: 46px;
}
.latest_tasks {
    margin: 0px;
    padding: 7px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
}
.latest_tasks ul {
    display: flex;
    justify-content: space-between;
    margin: 7px;
}
.latest_tasks ul li {
    font-size: 14px;
}
.set_up {
    color: #1432e3;
}
.van-dropdown-menu >>> .van-dropdown-menu__bar {
    box-shadow: none;
    border-bottom: 1px solid #e8e8e8;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
    .latest_tasks ul li {
        font-size: 13px;
    }
}
</style>
