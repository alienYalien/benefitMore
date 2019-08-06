
module.exports = {
  conigdata:confdata,
  itemdata:itemdata,
  shareinfo:shareinfo,
  meInfo: meInfo,
}

function meInfo () {
  
  var arr = {
      list:[
        {
          iconaddr: '../../images/myupside.png',
          name: '我的组织',
          hasSec: false,//是否有二级界面
          linkpage: '',
          rightarrowaddr: '../../images/rightarrow.png',

        },
        {
          iconaddr: '../../images/myitems.png',
          name: '我的公益活动',
          hasSec: true,//是否有二级界面
          linkpage: '',
          rightarrowaddr:'../../images/rightarrow.png',
         
        },
        {
          iconaddr: '../../images/mysales.png',
          name: '我的发起人',
          hasSec: true,//是否有二级界面
          linkpage: '',
          rightarrowaddr: '../../images/rightarrow.png',
        
        }
      ]
  }

  return arr;

}

function shareinfo () {
  var arr = {
    list:[
      // {
      //   id: 1,
      //   content: '创建公益活动',
      //   imageurl: 'share1.png',
      // },
      {
        id: 1,
        content: '推荐公益人',
        imageurl: 'share2.png',
      },
    ]
  }
  return arr;
}

function confdata () {
    var arr = {
      list:[
      {
        child:[
            {
            id: 1,
            content: '',
            length: 10,
            placeholder:'发起人姓名',
            texttype:'text',
            leastLength:4,
            disabled: false,
            css:'bc1',
            css2: 'singleline-input',
            phcss: '',
            },
            {
              id: 2,
              content: '',
              length: 15,
              placeholder: '发起组织名称',
              texttype: 'text',
              leastLength: 6,
              disabled: false,
              css: 'bc1',
              css2: 'singleline-input',
              phcss: '',
            },
        ]
      },
      {
        child: [
          {
            id: 3,
            content: '',
            length: 11,
            placeholder: '手机号',
            texttype: 'number',
            leastLength: 11,
            disabled: true,
            css: 'noeditview',
            css2: 'noeditinput',
            phcss:'ph_noedit',
          },
          {
            id: 4,
            content: '',
            length: 11,
            placeholder: '发起人ID',
            texttype: 'text',
            leastLength: 11,
            disabled: true,
            css: 'noeditview',
            css2: 'noeditinput',
            phcss: 'ph_noedit',
          },
          
        ]
      },
      ]
    }

    return arr;
}

function itemdata () {
  var arr = {
    namelength:2,
    cmpnamelength:6,
    itemnamelength:2,
    phonelength:10,
    busidlength:1,
    list: [
      {
        index:'0',
        id: 1,
        content: '',
        length: 20,
        placeholder: '活动类型',
        texttype: 'text',
        leastLength: 6,
        array:[
            "学校组织",
            "个人",
            "社区组织",
            "俱乐部",
        ],
      },
      {
        index: '0',
        id: 2,
        content: '',
        length: 20,
        placeholder: '活动形式',
        texttype: 'text',
        leastLength: 6,
        array: [
          '培训',  
          '户外活动、探访',
          '晚会、公益演出',
          '沙龙、讲座、论坛',
          '爱心捐募',
          '公益广告、微电影',
        ],
      },
      {
        index: '0',
        id: 3,
        content: '',
        length: 20,
        placeholder: '活动领域',
        texttype: 'text',
        leastLength: 6,
        array: [
          "扶贫济困",//0
          "医疗卫生",//1
          "弱势群体",//2
          "动物保护",//3
          "生态环境",//4
          "知识传播",//5
          "关爱生命",//6
          "公共福利",//7
          "空气保护",//8
          "植被保护",//9
          "毒品教育",//10
          "儿童成长",//11
          "公益创业",//12       
          "其他",//13
        ],
      },
    ]
  }
  return arr;
}

