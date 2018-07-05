import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/readme',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [{
          path: '/',
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
        //审核
        {
          path: '/checkfirst',
          component: resolve => require(['../components/project/CheckFirst.vue'], resolve)
        },
        {
          path: '/checktwo',
          component: resolve => require(['../components/project/CheckTwo.vue'], resolve)
        },
        {
          path: '/checkdetail',
          component: resolve => require(['../components/project/CheckDetail.vue'], resolve)
        },
        {
          path: '/imgdeal',
          component: resolve => require(['../components/project/ImgDeal.vue'], resolve)
        },
        {
          path: '/checkdetailtwo',
          component: resolve => require(['../components/project/CheckDetailTwo.vue'], resolve)
        },

        {
          path: '/checkpeople',
          component: resolve => require(['../components/project/CheckPeople.vue'], resolve)
        },
        {
          path: '/checkbatchrefuse',
          component: resolve => require(['../components/project/CheckBatchRefuse.vue'], resolve)
        },
        {
          path: '/internalrecord',
          component: resolve => require(['../components/project/InternalRecord.vue'], resolve)
        },
        {
          path: '/auditrecord',
          component: resolve => require(['../components/project/AuditRecord.vue'], resolve)
        },
        //资金
        {
          path: '/cashoperation',
          component: resolve => require(['../components/project/CashOperation.vue'], resolve)
        },
        {
          path: '/cashback',
          component: resolve => require(['../components/project/CashBack.vue'], resolve)
        },
        {
          path: '/cashrecharge',
          component: resolve => require(['../components/project/CashRecharge.vue'], resolve)
        },
        {
          path: '/cashlist',
          component: resolve => require(['../components/project/CashList.vue'], resolve)
        },
        //业务
        {
          path: '/businessdeal',
          component: resolve => require(['../components/project/BusinessDeal.vue'], resolve)
        },
        {
          path: '/businessrepayment',
          component: resolve => require(['../components/project/BusinessRepayment.vue'], resolve)
        },
        //催收
        {
          path: '/collection',
          component: resolve => require(['../components/project2/Collection.vue'], resolve)
        },
        {
          path: '/collectionlist',
          component: resolve => require(['../components/project2/CollectionList.vue'], resolve)
        },
        {
          path: '/collectiondetails',
          component: resolve => require(['../components/project2/CollectionDetails.vue'], resolve)
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
  ]
})
