<template>
  <div class="WorkbenchBranch">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='客户池'">
      <div class="screen_content">
        <van-search v-model="search_txt" show-action placeholder="客户名称" @search="onSearch">
          <template #action>
            <div @click="$router.push('/PutRecord/?title=筛选')">筛选</div>
          </template>
        </van-search>
      </div>
      <div class="customer_list">
        <ul v-for="(thisItem,index) in customer_pool" :key="index" class="cartItem">
          <van-checkbox class="selctBtn" v-model="thisItem.id" shape="square"></van-checkbox>
          <li class="newCustomerList" style="width:100%">
            <router-link
              tag="p"
              style="width:98%;margin:0"
              :to='{ name: "ArticleViewBasic", query: { title: "客户视图" }}'
            >{{thisItem.name}}</router-link>
            <p style="width:1%"></p>
            <p class="schedule_star">
              <van-rate
                v-model="value"
                :size="18"
                color="#0078D7"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p style="color: #df0f0f;">{{thisItem.text}}</p>
            <p style="color: #1BADF2;">{{thisItem.platinum_customers}}</p>
            <p class="marter">
              <span v-if="thisItem.business1" class="business1">{{thisItem.business1}}</span>
              <span v-if="thisItem.business2" class="business2">{{thisItem.business2}}</span>
              <span v-if="thisItem.business3" class="business3">{{thisItem.business3}}</span>
            </p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <div class="save" style="margin-top:50px">
        <van-button type="primary" size="small" color="rgb(61, 66, 94)" @click="showPopup()">批量分配</van-button>
      </div>
      <div v-show="isPopupVisibleScreen" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">客户查询</p>
          <div class="pop_content">
            <p style="display:flex">
              <span style="display: inline-block;width: 15%;line-height: 2rem;">姓名：</span>
              <input
                style="border:0.05rem solid #bbb;width:85%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 15%;line-height: 2rem;">编号：</span>
              <input
                style="border:0.05rem solid #bbb;width:85%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 20%;line-height: 2rem;">AUM ：</span>
              <input
                style="border:0.05rem solid #bbb;width:80%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 40%;line-height: 2rem;">重点客户：</span>
              <select
                style="border:0.05rem solid #bbb;width:60%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 35%;line-height: 2rem;">客户群体：</span>
              <input
                style="border:0.05rem solid #bbb;width:65%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="可多选"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">客户等级：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="铂金">铂金</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 30%;line-height: 2rem;">推荐产品：</span>
              <input
                style="border:0.05rem solid #bbb;width:70%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="选产品，找匹配客户"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">最高学历：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 35%;line-height: 2rem;">性别：</span>
              <select
                style="border:0.05rem solid #bbb;width:35%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-right:0.5rem"
                name
                id
              >
                <option value="网格类型">男</option>
                <option value="自定义">女</option>
              </select>
              <span style="display: inline-block;width: 35%;line-height: 2rem;">年龄：</span>
              <input
                style="border:0.05rem solid #bbb;width:50%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">职业类别：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">所属机构：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 30%;line-height: 2rem;">区域网格：</span>
              <input
                style="border:0.05rem solid #bbb;width:85%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="选产品，找匹配客户"
              />
            </p>
            <div style="padding:0" class="save">
              <button @click="closePopupScreen()">查询</button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="isPopupVisible" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">批量分配</p>
          <div class="pop_content">
            <van-field
              v-model="grid_name"
              name="网格名称"
              label="网格名称"
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写网格名称' }]"
            />
            <van-field
              readonly
              clickable
              name="picker"
              :value="grid_theme_txt"
              label="网格主题"
              placeholder="点击选择网格主题"
              @click="grid_theme = true"
            />
            <van-popup v-model="grid_theme" position="bottom">
              <van-picker
                show-toolbar
                :columns="grid_theme_list"
                @confirm="onGrid_theme"
                @cancel="grid_theme = false"
              />
            </van-popup>
            <dl>
              <dt
                style="display: flex;background:#E6E3E3;border:0.05rem solid #bbb;justify-content: space-around;line-height:2rem;margin-top:1rem"
              >
                <p style="margin:0rem">编号</p>
                <p style="margin:0rem">名称</p>
              </dt>
              <dd
                style="display: flex;flex-flow: row;position: relative;align-items: center;height: 2rem;margin-top: 0.3rem; margin-left:5px;"
                v-for="(thisItem,index) in customer_pool_pop"
                :key="index"
              >
                <van-radio-group v-model="radio">
                  <van-radio :name="thisItem.id" style="height: 2rem">
                    <li
                      style="width:12rem;list-style-type:none;display: flex;justify-content: space-around;align-items: flex-end;"
                    >
                      <p style="margin:0rem;width:35%">{{thisItem.name}}</p>
                      <p style="margin:0rem;width:55%">{{thisItem.text}}</p>
                    </li>
                  </van-radio>
                </van-radio-group>
              </dd>
            </dl>
            <div style="margin-top:2rem" class="save">
              <button style="margin-right:1rem" @click="closePopup()">确定</button>
              <button @click="closePopup()">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="typeCN=='客户'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input type="text" placeholder="客户名称" />
        <button @click="$router.push('/ContentManage/PutRecord/?title=筛选')">筛选</button>-->
        <van-search v-model="value" show-action placeholder="客户名称" @search="onSearch">
          <template #action>
            <div @click="onSearch">筛选</div>
          </template>
        </van-search>
        <!-- @click="showPopupScreen()" -->
      </div>
      <div class="customer_list">
        <ul v-for="(thisItem,index) in newCustomerList" :key="index">
          <li class="newCustomerList">
            <p
              @click="$router.push('/ContentManage/ArticleViewBasic/'+thisItem.id+'?title=客户视图')"
            >{{thisItem.name}}</p>
            <p>
              <span v-if="thisItem.business1" class="business1">{{thisItem.business1}}</span>
              <span v-if="thisItem.business2" class="business2">{{thisItem.business2}}</span>
              <span v-if="thisItem.business3" class="business3">{{thisItem.business3}}</span>
            </p>
            <p class="schedule_star">
              <van-rate
                v-model="value"
                :size="25"
                color="blue"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p style="color: #df0f0f;">{{thisItem.text}}</p>
            <p style="color: #1BADF2;">{{thisItem.platinum_customers}}</p>
            <p>{{thisItem.date}}</p>
            <p style="color: #df0f0f;">{{thisItem.key_customers}}</p>
            <p style="color: #1432E3;" @click="showBack()">{{thisItem.back}}</p>
          </li>
        </ul>
        <van-dialog v-model="show_back" title="你确定退回吗" show-cancel-button></van-dialog>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <div v-show="isPopupVisibleScreen" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">客户查询</p>
          <div class="pop_content">
            <p style="display:flex">
              <span style="display: inline-block;width: 15%;line-height: 2rem;">姓名：</span>
              <input
                style="border:0.05rem solid #bbb;width:85%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 15%;line-height: 2rem;">编号：</span>
              <input
                style="border:0.05rem solid #bbb;width:85%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 20%;line-height: 2rem;">AUM ：</span>
              <input
                style="border:0.05rem solid #bbb;width:80%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 40%;line-height: 2rem;">是否重点客户：</span>
              <select
                style="border:0.05rem solid #bbb;width:60%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 35%;line-height: 2rem;">所属客户群体：</span>
              <input
                style="border:0.05rem solid #bbb;width:65%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="可多选"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">客户等级：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="铂金">铂金</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 30%;line-height: 2rem;">推荐产品：</span>
              <input
                style="border:0.05rem solid #bbb;width:70%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="选产品，找匹配客户"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">最高学历：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 35%;line-height: 2rem;">性别：</span>
              <select
                style="border:0.05rem solid #bbb;width:35%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-right:0.5rem"
                name
                id
              >
                <option value="网格类型">男</option>
                <option value="自定义">女</option>
              </select>
              <span style="display: inline-block;width: 35%;line-height: 2rem;">年龄：</span>
              <input
                style="border:0.05rem solid #bbb;width:50%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">职业类别：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 25%;line-height: 2rem;">所属机构：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display:flex">
              <span style="display: inline-block;width: 30%;line-height: 2rem;">区域网格：</span>
              <input
                style="border:0.05rem solid #bbb;width:85%;padding:0rem 0.5rem;border-radius:0.3rem"
                type="text"
                placeholder="选产品，找匹配客户"
              />
            </p>
            <div style="padding:0" class="save">
              <button @click="closePopupScreen()">查询</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="typeCN=='黑名单'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width: 98%;" type="text" placeholder="客户名称" />-->
        <van-search v-model="search_txt" placeholder="客户名称" />
        <!-- <button>筛选</button> -->
      </div>
      <div class="customer_list">
        <ul
          v-for="(thisItem,index) in black_list"
          :key="index"
          @click="$router.push('/ContentManage/ArticleViewBasic/'+thisItem.id+'?title=客户视图')"
        >
          <li>
            <p>{{thisItem.name}}</p>
            <p>{{thisItem.date}}</p>
            <p v-if="thisItem.have==2" class="schedule_star">
              <!-- <img src="./blue_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />-->
              <van-rate
                v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
    <div v-if="typeCN=='成员轨迹'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width: 98%;" type="text" placeholder="用户名称" />-->
        <van-search v-model="search_txt" placeholder="用户名称" />
        <!-- <button>筛选</button> -->
      </div>
      <ul class="time_vant">
        <li style>
          <van-cell title="选择日期区间" :value="date" @click="show = true" />
          <van-calendar v-model="show" type="range" @confirm="onConfirm" />
        </li>
        <li class="time_search">
          <button @click="showLabel">查询</button>
        </li>
      </ul>
      <div class="customer_list">
        <baidu-map class="bm-view" :center="{lng:114.65, lat: 33.37}" :zoom="11" ak="YOUR_APP_KEY">
          <!-- <bm-overlay
            pane="labelPane"
            :class="{sample: true, active}"
            @draw="draw"
            @mouseover.native="active = true"
            @mouseleave.native="active = false"
          >
            <div style="width:21rem;height:22rem;border:0.07rem dashed #D33E42"></div>
          </bm-overlay>-->
          <bm-polygon
            v-if="showBdLabel"
            :path="polylinePath"
            stroke-color="#DF0F0F"
            strokeStyle="dashed"
            fillColor="transparent"
            :stroke-opacity="1"
            :stroke-weight="1"
            @lineupdate="updatePolylinePath"
          ></bm-polygon>
          <bm-label
            v-if="showBdLabel"
            content="1"
            :position="{lng: 114.725, lat: 33.415}"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="2"
            :position="{lng: 114.7, lat: 33.385 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="3"
            :position="{lng: 114.675, lat: 33.345 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="4"
            :position="{lng: 114.49, lat: 33.38 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="5"
            :position="{lng: 114.645, lat: 33.475 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="6"
            :position="{lng: 114.72, lat: 33.49}"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <!-- <bm-label
            content="城关镇世纪广场"
            :position="{lng: 114.565, lat: 33.4}"
            :labelStyle="{color: 'red', fontSize : '0.9rem',width:'4rem',height:'2rem',lineHeight: '2rem',textAlign: 'center',background: 'transparent',border:'none'}"
            title="Hover me"
          />-->
        </baidu-map>
      </div>
    </div>
    <div v-if="typeCN=='任务管理'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input type="text" placeholder />
        <button>高级</button>-->
        <van-search v-model="search_txt" show-action placeholder="客户名称" @search="onSearch">
          <template #action>
            <div @click="onSearch">高级</div>
          </template>
        </van-search>
      </div>
      <div class="customer_list success">
        <list>
          <item
            v-for="(thisItem,index) in new_task"
            :key="index"
            @click.native="$router.push('/ContentManage/ArticleViewBasicNew/'+thisItem.id+'?title=任务详情')"
            style="padding:0.5rem;"
          >
            <div class="right_content success_failure">
              <div class="new_task">
                <p style="font-weight:550">{{thisItem.company_source}}</p>
                <p style="text-align:center!important;width: 38%!important;">{{thisItem.menoy}}</p>
                <p style="width: 38%;">{{thisItem.date_start}}</p>
              </div>
              <div class="new_task">
                <p>{{thisItem.company_introduce}}</p>
                <p style="text-align:center!important;width: 38%!important;">{{thisItem.name}}</p>
                <p style="width: 38%;">{{thisItem.date_end}}</p>
              </div>

              <div
                v-if="thisItem.success_failure"
                :class="thisItem.sf_state==1 ? 'sf_state' : 'sf_states'"
              >{{thisItem.success_failure}}</div>
            </div>
          </item>
        </list>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
        <!-- <ul
          v-for="(thisItem,index) in task_management"
          :key="index"
          @click="$router.push('/ContentManage/PutRecord/?title=任务详情')"
        >
          <div v-if="thisItem.num==1" class="task_management">已成功</div>
          <li>
            <p>{{thisItem.name1}}</p>
            <p>{{thisItem.date}}</p>
            <p>{{thisItem.name2}}</p>
            <div class="schedule_star progress">
              <div
                class="progress-done"
                data-done="68"
                :style="{width:thisItem.percentage1,background:thisItem.color1}"
              >{{thisItem.percentage1}}</div>
            </div>
            <p></p>
            <p style="display:flex;justify-content: space-between;">
              <span>{{thisItem.company}}</span>
              <span>{{thisItem.person}}</span>
            </p>
            <p>{{thisItem.target}}</p>
            <div class="schedule_star progress">
              <div
                class="progress-done"
                data-done="68"
                :style="{width:thisItem.percentage2,background:thisItem.color2}"
              >{{thisItem.percentage2}}</div>
            </div>
          </li>
        </ul>-->
      </div>
    </div>
    <div v-if="typeCN=='潜在客户'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width:98%" type="text" placeholder="客户名称" />-->
        <!-- <button>筛选</button> -->
        <van-search v-model="search_txt" placeholder="客户名称" />
      </div>
      <div class="customer_list">
        <ul
          v-for="(thisItem,index) in customer_list"
          :key="index"
          @click="$router.push('/ContentManage/PutRecord/?title=潜在客户详情')"
        >
          <li>
            <p>{{thisItem.name}}</p>
            <p>{{thisItem.text}}</p>
            <p class="schedule_star">
              <!-- <img src="./blue_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />-->
              <van-rate
                v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>{{thisItem.date}}</p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <div
        style="margin-left:85%;position: fixed !important;float: right;z-index: 9999;align-items: right;bottom: 50px;right:5%"
      >
        <span class="add_record" @click="$router.push('/ContentManage/PutRecord/?title=潜在客户添加')">+</span>
      </div>
    </div>
    <div v-if="typeCN=='农户'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width:98%" type="text" placeholder="客户名称" />-->
        <!-- <button>筛选</button> -->
        <van-search v-model="search_txt" placeholder="客户名称" />
      </div>
      <div class="customer_list">
        <ul
          v-for="(thisItem,index) in peasant_household"
          :key="index"
          @click="$router.push('/ContentManage/CustomerView/?title=农户')"
        >
          <li>
            <p>{{thisItem.num}}</p>
            <p>{{thisItem.name}}</p>
            <p>{{thisItem.text}}</p>
            <p>{{thisItem.date}}</p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <div
        style="margin-left:85%;position: fixed !important;float: right;z-index: 1;align-items: right;bottom: 50px;right:5%"
      >
        <span class="add_record" @click="showPopupFamily()">+</span>
      </div>
      <div v-show="isPopupVisibleFamily" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">添加</p>
          <div class="pop_content">
            <ul class="stock cw_stock peasant_households">
              <li>*家庭类型：</li>
              <li>
                <select name id>
                  <option value="务工，务农型">务工，务农</option>
                  <option value="经营型">经营型</option>
                </select>
              </li>
              <li>*区域网格：</li>
              <li>
                <input type="text" placeholder="搜索区域网格" />
                <!-- <img src="./search.svg" alt /> -->
              </li>
              <li>居住地址：</li>
              <li>
                <input type="text" placeholder="单行输入" />
              </li>
              <li>经纬度：</li>
              <li>
                <input type="text" placeholder="点击图标地图选取" />
                <img src="../../assets/WorkBench/md-room.svg" alt />
              </li>
            </ul>
            <div style="margin-top:2rem" class="save">
              <button style="margin-right:1rem" @click="closePopupFamily()">保存</button>
              <button style="margin-right:1rem" @click="closePopupFamily()">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="typeCN=='客户认领'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width:98%" type="text" placeholder="客户名称" />-->
        <!-- <button>筛选</button> -->
        <van-search v-model="search_txt" placeholder="客户名称" />
      </div>
      <div class="customer_list">
        <ul v-for="(thisItem,index) in customer_list" :key="index" class="cartItem">
          <li style="width:100%">
            <p style="width:98%">{{thisItem.name}}</p>
            <p style="width:1%"></p>
            <p class="schedule_star">
              <!-- <img src="./blue_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />-->
              <van-rate
                v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>
              <a style="text-decoration:none;margin-right:0.6rem">认领</a>
            </p>
          </li>
          <div
            class="selctBtn"
            :class="thisItem.checked?'checked':''"
            @click="selectItem(thisItem)"
          ></div>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <div class="save" style="margin-top:10rem">
        <button @click="showPopup()">批量认领</button>
      </div>
      <div v-show="isPopupVisible" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">批量认领</p>
          <div class="pop_content">
            <input
              style="border:0.05rem solid #bbb;width:100%;padding:0rem 0.5rem"
              type="text"
              placeholder="网格名称"
            />
            <!-- <select
              style="border:0.05rem solid #bbb;width:100%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
              name
              id
            >
              <option value="网格类型">网格类型</option>
              <option value="自定义">自定义</option>
              <option value="行政区域">行政区域</option>
            </select>-->
            <select
              style="border:0.05rem solid #bbb;width:100%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
              name
              id
            >
              <option value="网格主题">网格主题</option>
              <option value="2020特色存款营销">2020特色存款营销</option>
              <option value="etc开通">etc开通</option>
              <option value="助农贷款">助农贷款</option>
            </select>
            <dl>
              <dt
                style="display: flex;background:#E6E3E3;border:0.05rem solid #bbb;justify-content: space-around;line-height:2rem;margin-top:1rem"
              >
                <p style="margin:0rem">编号</p>
                <p style="margin:0rem">名称</p>
              </dt>
              <dd
                style="display: flex;flex-flow: row;position: relative;align-items: center;height: 2rem;margin-top: 0.3rem;"
                v-for="(thisItem,index) in customer_pool_pop"
                :key="index"
              >
                <!-- <div
                  style="width: 1.2rem;height: 1.2rem;border: 0.05rem solid #000;margin: 1rem 0rem 0rem 1.2rem; cursor: pointer;border-radius: 100%;"
                  :class="thisItem.checked?'checked':''"
                  @click="selectItem(thisItem)"
                ></div>
                <li
                  style="width:90%;list-style-type:none;display: flex;justify-content: space-around;align-items: flex-end;"
                  class="newCustomerList"
                >
                  <p style="margin:0rem">{{thisItem.name}}</p>
                  <p style="margin:0rem">{{thisItem.text}}</p>
                </li>-->
                <van-radio-group v-model="radio" style>
                  <van-radio :name="thisItem.id" style="width:100%;height:2rem">
                    <li
                      style="width:11rem;list-style-type:none;display: flex;justify-content: space-around;align-items: flex-end;"
                    >
                      <p style="margin:0rem;width:35%">{{thisItem.name}}</p>
                      <p style="margin:0rem;width:55%">{{thisItem.text}}</p>
                    </li>
                  </van-radio>
                </van-radio-group>
              </dd>
            </dl>
            <div style="margin-top:3rem" class="save">
              <button style="margin-right:1rem" @click="closePopup()">确定</button>
              <button @click="closePopup()">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="typeCN=='客户认领审批'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width:98%" type="text" placeholder="客户名称" />-->
        <!-- <button>筛选</button> -->
        <van-search v-model="search_txt" placeholder="客户名称" />
      </div>
      <div class="customer_list">
        <ul v-for="(thisItem,index) in customer_list2" :key="index">
          <li>
            <p>{{thisItem.name}}</p>
            <p class="approval">
              <a v-if="thisItem.text==1" href style="text-decoration:none;margin-right:0.6rem">未审批</a>
              <span v-if="thisItem.text==2" class="approval_Failed">未通过</span>
              <span v-if="thisItem.text==3" class="approval_Passed">已通过</span>
            </p>
            <p class="schedule_star">
              <!-- <img src="./blue_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />-->
              <van-rate
                v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>{{thisItem.date}}</p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
    <div v-if="typeCN=='最近联系'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width:98%" type="text" placeholder="客户名称" />-->
        <!-- <button>筛选</button> -->
        <van-search v-model="search_txt" placeholder="客户名称" />
      </div>
      <ul class="time_frame" style="border-bottom: 0.001rem solid #e8e8e8">
        <li @click="tab(0)" :class="tabId==0?'cur':''">三天内</li>
        <li @click="tab(1)" :class="tabId==1?'cur':''">一周内</li>
        <li @click="tab(2)" :class="tabId==2?'cur':''">两周内</li>
      </ul>
      <div v-show="tabId===0" class="customer_list">
        <ul
          v-for="(thisItem,index) in data_customer_list1"
          :key="index"
          @click="$router.push('/ContentManage/ArticleViewBasic/'+thisItem.id+'?title=客户视图')"
        >
          <li>
            <p>{{thisItem.name}}</p>
            <p>{{thisItem.text}}</p>
            <p class="schedule_star">
              <!-- <img src="./blue_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />-->
              <van-rate
                v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>{{thisItem.date}}</p>
          </li>
        </ul>
      </div>
      <div v-show="tabId===1" class="customer_list">
        <ul
          v-for="(thisItem,index) in data_customer_list2"
          :key="index"
          @click="$router.push('/ContentManage/ArticleViewBasic/'+thisItem.id+'?title=客户视图')"
        >
          <li>
            <p>{{thisItem.name}}</p>
            <p>{{thisItem.text}}</p>
            <p class="schedule_star">
              <!-- <img src="./blue_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />-->
              <van-rate
                v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>{{thisItem.date}}</p>
          </li>
        </ul>
      </div>
      <div v-show="tabId===2" class="customer_list">
        <ul
          v-for="(thisItem,index) in data_customer_list3"
          :key="index"
          @click="$router.push('/ContentManage/ArticleViewBasic/'+thisItem.id+'?title=客户视图')"
        >
        
          <li>
            <p>{{thisItem.name}}</p>
            <p>{{thisItem.text}}</p>
            <p class="schedule_star">
              <!-- <img src="./blue_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />
              <img src="./grey_star.svg" alt />-->
              <van-rate
                v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>{{thisItem.date}}</p>
          </li>
        </ul>
      </div>

      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
    <div v-if="typeCN=='工作日志'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width:98%" type="text" placeholder="客户名称" />-->
        <!-- <button>筛选</button> -->
        <van-search v-model="search_txt" placeholder="客户名称" />
      </div>
      <ul class="time_frame">
        <li>
          <datepicker
            style="border:1px solid #"
            v-model="birthday"
            label="Enter Date"
            date-format="yyyy-mm-dd"
          ></datepicker>
        </li>
        <li>
          <datepicker v-model="birthday" label="Enter Date" date-format="yyyy-mm-dd"></datepicker>
        </li>
      </ul>
      <div class="work_log">
        <ul v-for="(thisItem,index) in work_log" :key="index">
          <li>
            <p class="work_log_date">
              <span>{{thisItem.date}}</span>
            </p>
            <p class="work_log_name">
              <span>{{thisItem.name}}</span>
            </p>
          </li>
        </ul>
      </div>

      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
    <div v-if="typeCN=='排行榜'">
      <div style="background:#fff">
        <ul class="ranking_list" style="height:2.5rem;line-height:2.5rem">
          <li @click="tab1(0)" :class="tabId==0?'cur':''">本月</li>
          <li @click="tab1(1)" :class="tabId==1?'cur':''">本季度</li>
          <li @click="tab1(2)" :class="tabId==2?'cur':''">本年度</li>
          <li @click="tab1(3)" :class="tabId==3?'cur':''">上半年</li>
          <li @click="tab1(4)" :class="tabId==4?'cur':''">下半年</li>
        </ul>
        <ul
          class="ranking_list"
          style="background:#f5f5f5;margin:0rem;width:100%;padding:0rem 1rem"
        >
          <li @click="tab2(5)" :class="tabId1==5?'cur':''">存款</li>
          <li @click="tab2(6)" :class="tabId1==6?'cur':''">贷款</li>
          <li @click="tab2(7)" :class="tabId1==7?'cur':''">理财</li>
          <li @click="tab2(8)" :class="tabId1==8?'cur':''">手机银行</li>
          <li @click="tab2(9)" :class="tabId1==9?'cur':''">网银</li>
          <li @click="tab2(10)" :class="tabId1==10?'cur':''">ETC</li>
        </ul>
        <ul
          class="ranking_list"
          style="justify-content: start;background:#f5f5f5;margin:0rem;width:100%;padding:0rem 1rem"
        >
          <li @click="tab2(11)" :class="tabId1==11?'cur':''" style="margin-right:1.5rem">跑动里程</li>
          <li @click="tab2(12)" :class="tabId1==12?'cur':''" style="margin-right:1.5rem">拜访客户数量</li>
          <li @click="tab2(13)" :class="tabId1==13?'cur':''" style="margin-right:1.5rem">执行任务数</li>
        </ul>
        <dl class="ranking_list_body">
          <dt>
            <ul>
              <li>排名</li>
              <li>人员</li>
              <li>成果</li>
            </ul>
          </dt>
          <dd>
            <ul
              v-for="(item,index) in achievements_list"
              :key="index"
              style="margin-top:1rem"
              v-show="tabId==item.id||tabId1==item.id||tabId2==item.id"
            >
              <li>
                <img :src="item.img" alt />
              </li>
              <li>{{item.name}}</li>
              <li>{{item.achievements}}</li>
            </ul>
          </dd>
        </dl>
        <div>
          <p style="text-align: center;">前5名业绩占比分析</p>
          <div id="main" style="width: 100%;height: 200px;"></div>
        </div>
      </div>
    </div>
    <div v-if="typeCN=='任务完成'">
      <div>
        <ul class="ranking_list" style="border-bottom: 0.01rem solid #e8e8e8 !important;">
          <li @click="tab1(0)" :class="tabId==0?'cur':''">本月</li>
          <li @click="tab1(1)" :class="tabId==1?'cur':''">本季度</li>
          <li @click="tab1(2)" :class="tabId==2?'cur':''">本年度</li>
          <li @click="tab1(3)" :class="tabId==3?'cur':''">上半年</li>
          <li @click="tab1(4)" :class="tabId==4?'cur':''">下半年</li>
        </ul>
        <ul class="ranking_list" style="border-bottom: 0rem solid #bbb;">
          <li @click="tab2(5)" :class="tabId1==5?'cur':''">存款</li>
          <li @click="tab2(6)" :class="tabId1==6?'cur':''">贷款</li>
          <li @click="tab2(7)" :class="tabId1==7?'cur':''">理财</li>
          <li @click="tab2(8)" :class="tabId1==8?'cur':''">手机银行</li>
          <li @click="tab2(9)" :class="tabId1==9?'cur':''">网银</li>
          <li @click="tab2(10)" :class="tabId1==10?'cur':''">ETC</li>
        </ul>
        <ul
          class="ranking_list"
          style="justify-content: start;border-bottom: 0.01rem solid #e8e8e8 !important;"
        >
          <li @click="tab2(11)" :class="tabId1==11?'cur':''" style="margin-right:1.5rem">跑动里程</li>
          <li @click="tab2(12)" :class="tabId1==12?'cur':''" style="margin-right:1.5rem">拜访客户数量</li>
          <li @click="tab2(13)" :class="tabId1==13?'cur':''" style="margin-right:1.5rem">执行任务数</li>
        </ul>
        <div class="situation">
          <div style="padding-top:3rem">
            完成情况：{{text1}}
            <p style="color: #df0f0f;font-size:1.8rem;padding-top:1rem;padding-bottom:1rem">
              <span v-show="text1=='存款'">120,000万元</span>
              <span v-show="text1=='理财'">12万元</span>
              <span v-show="text1=='网银'">1万元</span>
              <span v-show="text1=='贷款'">2,000万元</span>
              <span v-show="text1=='手机银行'">24万元</span>
              <span v-show="text1=='ETC'">22万元</span>
              <span v-show="text1=='跑动里程'">50公里</span>
              <span v-show="text1=='拜访客户数量'">12个</span>
              <span v-show="text1=='执行任务数'">3个</span>
            </p>
          </div>
          <ul>
            <li>{{text}}目标：123,222</li>
            <!-- <li>人均：234.00</li> -->
          </ul>
          <div style="background:#fff;border-bottom: 0.01rem solid #e8e8e8 !important;">
            <div id="gaugeContainer" style="width:100%; height:10rem;"></div>
          </div>
        </div>
        <div>
          <p style="font-size:1rem;padding-top:1rem;margin-left:0.5rem">近半年业绩趋势：{{text1}}</p>
          <div id="myChart" style="width: 100%;height: 15rem;background-color:#fff"></div>
        </div>
      </div>
    </div>
    <div v-if="typeCN=='产品目录'">
      <div class="not_select">
        <div class="divInput" style="width:98%">
          <div class="select_sort" @click="openValue1">
            <input v-model="value1" type="text" placeholder="存款" />
            <!-- <img src="./jiantou.png" /> -->
          </div>
          <div v-show="show1">
            <ul>
              <li
                @click="getvalue1(index,item)"
                v-for="(item,index) in tableData1"
                :key="item.index"
              >{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <!-- <div class="divInput">
          <div class="select_sort" @click="openValue2">
            <input v-model="value2" type="text" placeholder="客户意向" />
            <img src="./jiantou.png" alt />
          </div>
          <div v-show="show2">
            <ul>
              <li
                @click="getvalue2(index,item)"
                v-for="(item,index) in tableData2"
                :key="item.index"
              >{{ item.name }}</li>
            </ul>
          </div>
        </div>-->
      </div>
      <div class="customer_list">
        <ul
          style="border-bottom: 0.001rem solid #e8e8e8!important;"
          v-for="(thisItem,index) in MarketingRecord"
          :key="index"
          @click="$router.push('/ContentManage/PutRecord/?title=产品目录详情')"
        >
          <li>
            <p style="font-size:1rem;font-weight:600;">{{thisItem.name}}</p>
            <p class="schedule_star">{{thisItem.text}}</p>
            <p class="schedule_star">{{thisItem.text1}}</p>
            <p class="schedule_star">{{thisItem.date}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="typeCN=='知识库'">
      <div class="screen_content">
        <!-- <img src="./search.svg" alt />
        <input style="width:98%" type="text" placeholder="请输入标题" />-->
        <!-- <button>筛选</button> -->
        <van-search v-model="search_txt" placeholder="请输入标题" />
      </div>
      <div class="knowledge">
        <ul
          v-for="(item,index) in knowledge"
          :key="index"
          @click="$router.push('/ContentManage/CustomerView/?title=知识库详情')"
        >
          <li>
            <p style="font-size:1rem;">{{item.name}}</p>
            <p>{{item.date}}</p>
            <p class="right_cursor">
              <!-- <img src="./arrow_right.svg" alt /> -->
              <van-icon name="arrow" />
            </p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import echarts from "echarts";
import con1 from "../../assets/WorkBench/one.png";
import con2 from "../../assets/WorkBench/two.png";
import con3 from "../../assets/WorkBench/three.png";
import con4 from "../../assets/WorkBench/four.png";
import con5 from "../../assets/WorkBench/five.png";
import { option } from "./gauge-option";
export default {
  name: "WorkbenchBranch",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      grid_theme: 0,
      grid_theme_txt: "",
      grid_theme_list: ["网格主题", "2020特色存款营销", "etc开通", "助农贷款"],
      grid_theme: false,
      grid_name: "",
      checked: true,
      value: 1,
      radio: "1",
      search_txt: "",
      showBdLabel: false,
      MarketingRecord: [
        {
          id: 1,
          name: "企业贷",
          text: "支付工具",
          date: " 2020-08-30日前",
          text1: "资料采集",
        },
        {
          id: 2,
          name: "农户家庭",
          text: "生活缴费",
          date: "  2020-08-30日前",
          text1: "产品营销",
        },
      ],
      date: "",
      date1: "",
      show: false,
      show_back: false,
      active: false,
      circlePath: {
        center: {
          lng: 114.65,
          lat: 33.37,
        },
        radius: 5000,
      },
      polylinePath: [
        { lng: 114.75, lat: 33.41 },
        { lng: 114.72, lat: 33.38 },
        { lng: 114.69, lat: 33.32 },
        { lng: 114.5, lat: 33.365 },
        { lng: 114.65, lat: 33.47 },
        { lng: 114.75, lat: 33.5 },
      ],
      planning_results: [
        {
          date: "2020/08/10 9:00",
          name: "朝阳门XXX大厦",
          id: 1,
        },
        {
          date: "2020/08/10 9:00",
          name: "朝阳门XXX大厦",
          id: 2,
        },
        {
          date: "2020/08/10 9:00",
          name: "朝阳门XXX大厦",
          id: 3,
        },
        {
          date: "2020/08/10 9:00",
          name: "朝阳门XXX大厦",
          id: 4,
        },
        // {
        //   date: "2020/08/10 9:00",
        //   name: "朝阳门XXX大厦",
        //   id: 5,
        // },
      ],
      tableData1: [
        {
          name: "贷款",
        },
        {
          name: "理财",
        },
        {
          name: "支付工具",
        },
        {
          name: "基金",
        },
        {
          name: "保险",
        },
        {
          name: "生活缴费",
        },
      ],
      tableData2: [
        {
          name: "刘晓谈",
        },
        {
          name: "马小台",
        },
      ],
      tableData3: [
        {
          name: "营销成功",
        },
        {
          name: "尚未成功",
        },
      ],
      isPopupVisible: false,
      isPopupVisibleScreen: false,
      isPopupVisibleFamily: false,
      checkAllFlag: false,
      text: "本季度",
      text1: "存款",
      title: "",
      articleType: "---",
      typeCN: "",
      isLGB: true,
      styleDisplyType: "",
      isEdit: "true",
      isSearch: "true",
      isAdd: false,
      isDelete: false,
      tabId: 1,
      tabId1: 5,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      PayList: [
        { name: "学员续费预警：", num: "114", unit: "人" },
        { name: "学员待分班：", num: "175", unit: "名" },
        { name: "班级待结业：", num: "40", unit: "人" },
        { name: "学员预约课：", num: "3", unit: "次" },
        { name: "潜客试听待排课：", num: "10", unit: "人" },
        { name: "学员待补课：", num: "3083", unit: "名" },
        { name: "学员欠费：", num: "126", unit: "名" },
        { name: "未点名课次：", num: "892", unit: "次" },
        { name: "本月学员生日：", num: "12", unit: "名" },
      ],
      customer_list: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "上次联系",
          date: "三个月前",
          id: 1,
        },
        { name: "刘莎莎", text: "上次联系", date: "三个月前", id: 2 },
      ],
      data_customer_list1: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "上次联系",
          date: "一天前",
          id: 1,
        },
        { name: "吴宇迪", text: "上次联系", date: "两天前", id: 2 },
      ],
      data_customer_list2: [
        {
          name: "刘莎莎",
          text: "上次联系",
          date: "五天前",
          id: 1,
        },
      ],
      data_customer_list3: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "上次联系",
          date: "一周前",
          id: 1,
        },
        { name: "刘莎莎", text: "上次联系", date: "十三天前", id: 2 },
      ],
      black_list: [
        {
          name: "北京卓越联腾科技有限公司",
          date: "三个月前",
          id: 1,
          have: 1,
        },
        { name: "刘莎莎", date: "三个月前", id: 2, have: 2 },
      ],
      knowledge: [
        {
          name: "营销网格",
          date: "发布时间:2020-08-24",
          id: 1,
        },
        { name: "企业贷", date: "发布时间:2020-08-24", id: 2 },
      ],
      newCustomerList: [
        {
          name: "北京卓越联腾科技有限公司",
          date: "上次联系 三个月前",
          business1: "存款",
          business2: "贷款",
          business3: "理财",
          text: "AUM:300万",
          id: 1,
          platinum_customers: "铂金客户",
          key_customers: "重点客户 ",
          back: "退回",
        },
      ],
      customer_pool_pop: [
        {
          name: "20001",
          text: "世纪广场etc开通",
          id: 0,
        },
        {
          name: "10001",
          text: "柳芳社区etc开通",
          id: 1,
        },
      ],
      customer_pool: [
        {
          name: "北京卓越联腾科技有限公司",
          business1: "存款",
          business2: "贷款",
          business3: "理财",
          text: "AUM:300万",
          id: 0,
          platinum_customers: "铂金客户",
        },
        {
          name: "刘莎莎",
          business1: "存款",
          business3: "理财",
          text: "AUM:300万",
          id: 1,
          platinum_customers: "普惠金融",
        },
      ],
      peasant_household: [
        {
          num: "202008290001001",
          name: "务工、务工型",
          text: "户主：张燕",
          date: "成员数：6",
        },
      ],
      customer_list2: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "1",
          date: "张三丰·总行营业部",
        },
        { name: "刘莎莎", text: "2", date: "张三丰·总行营业部" },
        { name: "刘莎莎", text: "3", date: "张三丰·总行营业部" },
      ],
      new_task: [
        {
          company_source: "产品营销",
          menoy: "30万/100万",
          company_introduce: "企业贷",
          date_start: "创建日期：2020-08-01",
          date_end: "截止日期：2020-09-30",
          date: "剩余20天",
          success_failure: "失败",
          name: "张男",
          be_overdue: "已过期",
          sf_state: 1,
        },
        {
          company_source: "资料采集",
          menoy: "30户/30户",
          company_introduce: "农户家庭",
          date_start: "创建日期：2020-08-01",
          date_end: "截止日期：2020-09-30",
          date: "剩余20天",
          name: "张男",
          success_failure: "成功",
        },
      ],
      // task_management: [
      //   {
      //     name1: "产品营销",
      //     date: "2020-08-30日前",
      //     name2: "企业贷",
      //     percentage1: "100%",
      //     color1: "#C1B9B9",
      //     color2: "#3CC8AB",
      //     company: "XXXX支行",
      //     person: "张男",
      //     target: "目标  100万/100万",
      //     percentage2: "100%",
      //     num: 1,
      //   },
      //   {
      //     name1: "资料采集",
      //     date: "2020-08-30日前",
      //     name2: "农户家庭",
      //     percentage1: "50%",
      //     color1: "#C1B9B9",
      //     color2: "#D33E42",
      //     company: "XXXX支行",
      //     person: "张男",
      //     target: "目标  10户/30户",
      //     percentage2: "30%",
      //     num: 0,
      //   },
      // ],
      work_log: [
        {
          name: "对北京卓越联腾科技有限公司进行企业贷产品上门营销",
          date: "2020-08-20",
        },
        { name: "对刘莎莎进行理财1号产品电话营销", date: "2020-08-21" },
      ],
      recent_contact: [
        {
          name1: "网格分配",
          set_up: "设为未读",
          name2: "有新的网格分配给您，网格名称：XXXXX",
          date: "2020-09-09 15:00",
        },
        {
          name1: "生日提醒",
          set_up: "设为未读",
          name2: "客户张三将于2020-09-15（10天后）过生日",
          date: "2020-09-09 15:00",
        },
      ],
      achievements_list: [
        {
          img: con1,
          name: "张三",
          achievements: "￥19,715.20",
          id: 1,
        },
        {
          img: con2,
          name: "李四",
          achievements: "￥19,715.20",
          id: 4,
        },
        {
          img: con3,
          name: "王五",
          achievements: "￥19,715.20",
          id: 5,
        },
        {
          img: con4,
          name: "赵六",
          achievements: "￥19,715.20",
          id: 2,
        },
        {
          img: con5,
          name: "李东",
          achievements: "￥19,715.20",
          id: 8,
        },
        {
          img: con1,
          name: "赵丽",
          achievements: "￥19,715.20",
          id: 1,
        },
        {
          img: con2,
          name: "钱付",
          achievements: "￥19,715.20",
          id: 4,
        },
        {
          img: con3,
          name: "孙武",
          achievements: "￥19,715.20",
          id: 7,
        },
        {
          img: con4,
          name: "李林",
          achievements: "￥19,715.20",
          id: 10,
        },
        {
          img: con5,
          name: "周高",
          achievements: "￥19,715.20",
          id: 13,
        },
        {
          img: con2,
          name: "吴一",
          achievements: "￥19,715.20",
          id: 4,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 7,
        },
        {
          img: con4,
          name: "王侯",
          achievements: "￥19,715.20",
          id: 10,
        },
        {
          img: con5,
          name: "高崎",
          achievements: "￥19,715.20",
          id: 5,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 3,
        },
        {
          img: con4,
          name: "王侯",
          achievements: "￥19,715.20",
          id: 3,
        },
        {
          img: con5,
          name: "高崎",
          achievements: "￥19,715.20",
          id: 3,
        },

        {
          img: con4,
          name: "李林",
          achievements: "￥19,715.20",
          id: 10,
        },
        {
          img: con5,
          name: "周高",
          achievements: "￥19,715.20",
          id: 13,
        },
        {
          img: con2,
          name: "吴一",
          achievements: "￥19,715.20",
          id: 3,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 0,
        },
        {
          img: con4,
          name: "王侯",
          achievements: "￥19,715.20",
          id: 0,
        },
        {
          img: con5,
          name: "高崎",
          achievements: "￥19,715.20",
          id: 0,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 0,
        },
      ],
      charts: "",
      opinion: ["第一名", "第二名", "第三名", "第四名", "第五名", "其他"],
      opinionData: [
        { value: 335, name: "第一名", itemStyle: { color: "#6BD0CE" } },
        { value: 110, name: "第二名", itemStyle: { color: "#DF0F0F" } },
        { value: 35, name: "第三名", itemStyle: { color: "#D90BB2" } },
        { value: 110, name: "第四名", itemStyle: { color: "#ECD14A" } },
        { value: 100, name: "第五名", itemStyle: { color: "#079FD9" } },
        { value: 10, name: "其他", itemStyle: { color: "#101010" } },
      ],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    onGrid_theme(value) {
      this.grid_theme_txt = value;
      this.grid_theme = false;
    },
    onSearch(val) {
      Toast(val);
    },
    showLabel() {
      this.showBdLabel = true;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    date2string(v) {
      return this.$seeks.date2string(v);
    },
    subtitle: function (chars, num) {
      num = num || 28;
      if (chars && this.checksum(chars) > num) {
        var __endto = 0;
        var __sum = 0;
        for (var i = 0; i < chars.length; i++) {
          var c = chars.charCodeAt(i);
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            __sum++;
          } else {
            __sum += 2;
          }
          __endto++;
          if (__sum >= num) {
            break;
          }
        }
        return chars.substring(0, __endto) + "...";
      }
      return chars;
    },
    checksum(chars) {
      var sum = 0;
      for (var i = 0; i < chars.length; i++) {
        var c = chars.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          sum++;
        } else {
          sum += 2;
        }
      }
      return sum;
    },
    tab(ev) {
      this.tabId = ev;
      localStorage.setItem("indexTabId", this.tabId);
    },
    tab1(ev) {
      this.tabId = ev;
      if (ev === 0) {
        this.text = "本月";
      } else if (ev === 1) {
        this.text = "本季度";
      } else if (ev === 2) {
        this.text = "本年度";
      } else if (ev === 3) {
        this.text = "上半年";
      } else {
        this.text = "下半年";
      }
    },
    tab2(ev) {
      this.tabId1 = ev;
      if (ev === 5) {
        this.text1 = "存款";
      } else if (ev === 6) {
        this.text1 = "贷款";
      } else if (ev === 7) {
        this.text1 = "理财";
      } else if (ev === 8) {
        this.text1 = "手机银行";
      } else if (ev === 9) {
        this.text1 = "网银";
      } else if (ev === 10) {
        this.text1 = "ETC";
      } else if (ev === 11) {
        this.text1 = "跑动里程";
      } else if (ev === 12) {
        this.text1 = "拜访客户数量";
      } else {
        this.text1 = "执行任务数";
      }
    },
    openValue1() {
      this.show1 = !this.show1;
    },
    openValue2() {
      this.show2 = !this.show2;
    },
    openValue3() {
      this.show3 = !this.show3;
    },
    openValue4() {
      this.show4 = !this.show4;
    },
    openValue5() {
      this.show5 = !this.show5;
    },
    getvalue1(index, item) {
      this.value1 = item.name;
      this.show1 = false;
    },
    getvalue2(index, item) {
      this.value2 = item.name;
      this.show2 = false;
    },
    getvalue3(index, item) {
      this.value3 = item.name;
      this.show3 = false;
    },
    getvalue4(index, item) {
      this.value4 = item.name;
      this.show4 = false;
    },
    getvalue5(index, item) {
      this.value5 = item.name;
      this.show5 = false;
    },
    //选中一个item
    selectItem(thisItem) {
      if (typeof thisItem.checked == "undefined") {
        this.$set(thisItem, "checked", true);
      } else {
        thisItem.checked = !thisItem.checked;
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["4月", "5月", "6月", "7月", "8月"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "最高",
            type: "line",
            data: [1, 1, 4, 3, 2, 3, 0],
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true,
                },
                borderColor: "#22ecec", // 拐点边框颜色
                lineStyle: {
                  color: "#22ecec",
                },
              },
            },
            // markLine: {
            //   data: [{ type: "average", name: "平均值" }],
            // },
          },
        ],
      });
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.65, 33.37));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    showPopupScreen() {
      this.isPopupVisibleScreen = true;
    },
    showPopupFamily() {
      this.isPopupVisibleFamily = true;
    },
    closePopupScreen() {
      this.isPopupVisibleScreen = false;
    },
    closePopupFamily() {
      this.isPopupVisibleFamily = false;
    },
    showBack() {
      this.show_back = true;
      console.log(111);
    },
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    addPolylinePoint() {
      this.polylinePath.push({ lng: 116.404, lat: 39.915 });
    },
  },
  mounted() {
    this.drawLine();
    this.$nextTick(function () {
      this.drawPie("main");
    });
    let myChart = echarts.init(document.getElementById("gaugeContainer"));
    myChart.setOption(option);
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.marter span {
  margin: 0px 2px;
}
.van-search {
  width: 100%;
}
.WorkbenchBranch {
  padding-top: 46px;
}

.right_content p {
  width: 50%;
  color: #000;
}
.right_content p:nth-child(even) {
  text-align: right;
}
.new_task {
  width: 100%;
  display: flex;
}
.new_task p {
  width: 30%;
}
.success_failure {
  position: relative;
}
.success_failure .sf_state {
  position: absolute;
  top: -0.5rem;
  left: 35%;
  line-height: 4.8rem;
  width: 4.5rem;
  text-align: center;
  height: 4rem;
  background: url("../../assets/WorkBench/fail.png") no-repeat;
  background-size: cover;
}
.success_failure .sf_states {
  position: absolute;
  top: 0.3rem;
  color: transparent;
  left: 35%;
  width: 4.3rem;
  height: 2.7rem;
  background: url("../../assets/WorkBench/success.png") no-repeat;
  background-size: cover;
}
/* 下面是弹窗 */
.isPopupVisibleSign {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0rem;
  width: 100%;
  height: 100vh;
  padding: 0.5rem 0.5rem;
  background: rgba(193, 185, 185, 0.7);
}
.isPopupVisibleSign_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 77%;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
.pop_content {
  padding: 1rem 1rem 1rem 1rem;
}
.pop_title {
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  font-size: 1rem;
  height: 2.5em;
  margin: 0rem;
  line-height: 2.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

/* 上面是弹窗 */

/* 知识库 */
.knowledge ul {
  position: relative;
  padding: 1rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.knowledge ul .right_cursor {
  position: absolute;
  right: 0.5rem;
  margin: 0;
  top: 32%;
}
.knowledge ul .right_cursor img {
  width: 1.5rem;
}

/*  */
.not_select {
  display: flex;
  background: #fff;
}
.not_select .divInput {
  width: 50%;
  background: #fff;
}
.not_select .divInput ul {
  width: 50%;
  position: absolute;
  background: #fff;
  z-index: 6;
}
.not_select .divInput ul li {
  display: inline-block;
  list-style: none;
  width: 7rem;
  font-size: 0.8rem;
  /* border-top: 0.05rem solid #bbb; */
  background-color: #fff;
  margin: 0.4rem 1rem 0.4rem 1rem;
}
.not_select .divInput ul li:first-child {
  border: 0px;
}
.not_select .divInput .select_sort {
  /* width: 140px; */
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  position: relative;
  background-color: #fff;
}
.not_select .divInput .select_sort input {
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 0rem 1.2rem;
  border-radius: 0.3rem;
  margin-top: 5px;
  color: #1a1818;
  border: 1px solid #bbb;
  background-color: #fff;
}
.not_select .divInput .select_sort img {
  position: absolute;
  right: 16px;
  top: 7%;
  width: 7%;
}
.time_vant {
  margin: 0.5rem !important;
  display: flex;
}
.time_vant .time_search {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
.time_vant .time_search button {
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  border-radius: 0.3rem;
  border: none;
}
.time_vant li {
  margin: 0rem;
  border: 0.05rem solid #e8e8e8;
  width: 70%;
}
.line {
  text-align: center;
  width: 5rem;
  margin: 0;
  line-height: 2rem;
}
.line span {
  display: inline-block;
  width: 3rem;
  height: 0.05rem;
  background: #bbb;
  text-align: center;
}

.stock {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.stock p {
  margin: 0.5rem 0rem 0rem;
}
.stock:last-child {
  padding-bottom: 0.5rem;
}
.stock_have p {
  width: 33.3%;
}

.stock li {
  width: 63%;
  margin: 0.1rem 0rem;
}
.stock li:nth-child(odd) {
  width: 37%;
}
.stock li input,
.stock li select {
  border: 0.05rem solid #bbb;
  height: 2rem;
  background: #fff;
  padding-left: 0.5rem;
  width: 100%;
}
.cw_stock {
  line-height: 2rem;
}
.cw_stock li {
  position: relative;
}
.cw_stock li img {
  position: absolute;
  top: 0.6rem;
  right: 1rem;
  width: 1rem;
}
.peasant_households li {
  margin-top: 1rem;
}
.peasant_households li select,
.peasant_households li input {
  border-radius: 0.3rem;
}
.sample {
  left: 2rem !important;
  top: 10rem !important;
  position: absolute;
}
.planning_results {
  position: fixed;
  top: 13rem;
  left: 1rem;
  z-index: 50;
  font-size: 1rem;
  width: 12rem;
  padding-top: 0.5rem;
  background: rgba(250, 250, 250, 0.8);
}
.planning_results ul {
  margin: 0 !important;
  background: rgba(250, 250, 250, 0.8) !important;
}
.planning_results ul li {
  display: flex;
  margin: 0;
}
.planning_results ul li p {
  margin: 0;
  width: 70% !important;
}
.planning_results ul li .plan_num {
  width: 1.5rem !important;
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
  border: 0.05rem solid #bbb;
  border-radius: 100%;
  background: #fff;
}
.planning_results ul li p span {
  display: block;
}
.bm-view {
  width: 100%;
  height: 78vh;
}
.c-row-label {
  width: 70px;
}
.to_do_list {
  height: 3rem;
  line-height: 3rem;
  margin: 0rem 1rem;
  border-bottom: 0.1rem;
  font-size: 0.9rem;
}
.to_do_list .list_to_do {
  float: right;
  font-size: 0.8rem;
  color: #888;
}
.to_do_list .list_to_do i {
  margin-left: 0.3rem;
}
.to_do_list ul {
  border-top: 0.04rem dashed #000;
}
.to_do_list ul:first-child {
  border: 0;
}
.screen_content {
  display: flex;
  position: relative;
}
.screen_content input {
  width: 83%;
  height: 44px;
  margin: 4px;
  line-height: 20px;
  padding: 0rem 1rem 0rem 2.3rem;
  text-align: left;
  border-radius: 2px 2px 2px 2px;
  background-color: #fafafa;
  text-align: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 0, 0, 0);
}
.screen_content img {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 40%;
  left: 5%;
  z-index: 100;
  opacity: 0.5;
}
.screen_content input::-webkit-input-placeholder {
  text-align: left;
  font-size: 14px;
}
.screen_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: left;
  font-size: 14px;
}
.screen_content button {
  border: none;
  background: none;
}
.customer_list ul {
  background: #fff;
  /* margin-top: 10px; */
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
}
.customer_list ul li p {
  width: 60%;
  margin: 5px 0px;
}
.customer_list ul li p:nth-child(even) {
  text-align: right;
  width: 40%;
}
.customer_list .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
}
.work_log ul li {
  margin-top: 10px;
  height: 5rem;
  display: flex;
  flex-wrap: wrap;
}
.work_log ul {
  width: calc(99% - 0.5rem);
  margin-left: 0.4rem;
}
.work_log .work_log_date {
  background: #fff;
  width: calc(25% - 1rem);
  margin-right: 1rem;
  text-align: center;
  display: table;
  height: 5rem;
}
.work_log .work_log_date span,
.work_log .work_log_name span {
  display: table-cell;
  vertical-align: middle;
}
.work_log .work_log_name {
  background: #fff;
  width: 75%;
  padding: 0rem 1rem;
  display: table;
  height: 5rem;
}
/* .end_line {
  border-top: 0.05rem solid #bbb;
  margin: 1rem;
  padding-top: 0.5rem;
  text-align: center;
  
} */
.end_line {
  margin: 0.8rem;
  text-align: center;
  color: #c1b9b9;
  font-size: 1rem;
}
.time_frame {
  height: 3rem;
  line-height: 3rem;
  background-color: #fff;
  margin: 0.3rem;
  display: flex;
  padding: 0rem 1rem;
  justify-content: space-between;
}
.success {
  position: relative;
}
.task_management {
  position: absolute;
  line-height: 2rem;
  text-align: center;
  width: 6rem;
  height: 2rem;
  border: 1px solid #3cc8ab;
  color: #3cc8ab;
  top: 1.7rem;
  font-size: 0.8rem;
  left: 5rem;
  transform: rotate(336deg);
  -ms-transform: rotate(336deg);
  -moz-transform: rotate(336deg);
  -webkit-transform: rotate(336deg);
  -o-transform: rotate(336deg);
}
.approval {
  position: relative;
}
.approval .approval_Failed,
.approval .approval_Passed {
  position: absolute;
  line-height: 3.6rem;
  text-align: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 1px solid #ff9800;
  color: #ff9800;
  border-radius: 100%;
  top: -0.7rem;
  font-size: 0.8rem;
  right: 1rem;
  transform: rotate(330deg);
  -ms-transform: rotate(330deg); /* IE 9 */
  -moz-transform: rotate(330deg); /* Firefox */
  -webkit-transform: rotate(330deg); /* Safari 和 Chrome */
  -o-transform: rotate(330deg); /* Opera */
}
.approval .approval_Passed {
  border: 1px solid #259b24;
  color: #259b24;
}
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: rgb(61, 66, 94);
  color: #fff;
  font-size: 1.5rem;
}
.progress {
  background-color: rgba(100, 100, 100, 0.2);
  position: relative;
  height: 1.3rem;
  width: 50%;
  border: 1px solid #cecece;
}
.progress-done {
  background: #3cc8ab;
  /* background: linear-gradient(to left, rgb(52, 204, 1), rgb(247, 247, 203)); */
  /* box-shadow: 0 3px 3px -5px rgb(242, 112, 156), 0 2px 5px rgb(242, 112, 156); */
  height: 1.15rem;
  width: 0;
  transition: width 1s ease 0.3s;
  text-align: right;
  color: #fff;
  padding-right: 0.3rem;
  line-height: 1.05rem;
  margin-top: 0.05rem;
}

.set_up {
  color: #1432e3;
}
.two_select {
  display: flex;
  padding: 0.5rem 0rem;
  line-height: 3rem;
  justify-content: space-around;
}
.two_select select {
  width: 40%;
  height: 2rem;
  border-radius: 0.4rem;
  border: 0.05rem solid #bbb;
  padding: 0rem 0.5rem;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.ranking_list {
  display: flex;
  height: 2rem;
  width: 100%;
  line-height: 2rem;
  justify-content: space-between;
  width: calc(100% - 2rem);
  margin: 0rem 1rem;
  border-bottom: 0.01rem solid #e8e8e8 !important;
}
.ranking_list_body {
  padding: 1rem;
  margin: 0;
}
.ranking_list_body dt {
  font-weight: 600;
}
.ranking_list_body ul li {
  width: 33.3%;
  text-align: center;
}
.ranking_list_body ul {
  display: flex;
  justify-content: space-between;
}
.ranking_list_body ul li:first-child {
  text-align: left;
}
.ranking_list_body ul li:last-child {
  text-align: right;
}
.situation {
  background: #fff;
  width: 100%;
  text-align: center;
}
.situation ul {
  display: flex;
  justify-content: space-around;
}
.newCustomerList .business1 {
  display: inline-block;
  border: 0.05rem solid #0fb38f;
  color: #0fb38f;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business2 {
  display: inline-block;
  border: 0.05rem solid #1432e3;
  color: #1432e3;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business3 {
  display: inline-block;
  border: 0.05rem solid #ecd14a;
  color: #ecd14a;
  padding: 0.1rem 0.3rem;
}
.cartItem {
  display: flex;
  flex-flow: row;
  position: relative;
}
.selctBtn {
  /* width: 1.2rem;
  height: 1.2rem; */
  /* border: 1px solid #000; */
  margin: 1rem 0rem 0rem 1.2rem;
  position: absolute;
  top: -0.3rem;
  right: 1rem;
  /* cursor: pointer; */
}
/* .checked::before {
  position: absolute;
  content: "";
  font-size: 0.9rem;
  top: 50%;
  position: absolute;
  left: 50%;
  width: 1rem;
  height: 0.5rem;
  border: 0.1rem solid #fff;
  border-top: 0;
  border-right: 0rem;
  transform: rotate(-50deg) translate(0%, -125%);
} */
.checked {
  position: absolute;
  background: rgb(61, 66, 94);
  border: 1px solid rgb(61, 66, 94);
  color: #fff;
}
.cartItem li {
  width: 90%;
}
.save {
  /* background: #fff; */
  text-align: center;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  border-radius: 0.4rem;
  height: 2rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
  .customer_list ul li p {
    width: 57%;
  }
  .customer_list ul li p:nth-child(even) {
    width: 43%;
  }

  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .pop_title {
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .pop_content {
    padding: 0.5rem;
  }
  .save {
    padding-bottom: 2rem;
  }
  .knowledge ul {
    padding: 0.5rem;
    border-bottom: 0.001rem solid #e8e8e8;
  }
}
</style>
