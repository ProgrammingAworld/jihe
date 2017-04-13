import React from 'react';
import {ws} from '../../../lib/main.js';
import App from '../../common/App.jsx';
import ReactSwipe from 'react-swipe';
import ActivityPopup from '../../activity/components/Popup.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex:0,
            listDatas:[
                {
                    "aid": "2652512158_1",
                    "title": "她在莫干山用一幢小城堡圆了美式乡村梦，那里还有花园泳池和豌豆公主",
                    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/tDsnpp1NDxrJoopwTKJiaD7YG5icfBHyGubzodXyibChBibknMUia1icyD7fy3OndAJrg48njzJjM7oMrqWLAc3efibkQ/0?wx_fmt=jpeg",
                    "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=2652512158&idx=1&sn=18140582ebcf3f157f5d508b2793c6dc&scene=19#wechat_redirect",
                    "digest": "这是我在十八迈的第一夜，有酒，有肉，有朋友。",
                    "appmsgid": 2652512158,
                    "itemidx": 1,
                    "type": 9
                },
                {
                    "aid": "402134799_1",
                    "title": "遥远的山：是走过远山近水后梦回故里，让心沉淀的地方",
                    "cover": "http://mmbiz.qpic.cn/mmbiz/tDsnpp1NDxoEooVDThZibLgRUyic7mAESsUTDJDYIf5c7lXSXD4Gbic4Kc2uC7Un9tEibH2oiabxInkrEBRg0e5pgaQ/0?wx_fmt=jpeg",
                    "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=402134799&idx=1&sn=04337612db503236e74dbfc98d906131&scene=19#wechat_redirect",
                    "digest": "每个人心中都有一个梦，一个落叶归根的梦。而老王的这个梦，落在了离家更近的莫干山。这里有山、有林、有水、有田，还有一方精致的庭院。在这里，山不在遥远，而离梦想更近。",
                    "appmsgid": 402134799,
                    "itemidx": 1,
                    "type": 6,
                    "oldPrice":3
                },
                {
                    "aid": "403380281_1",
                    "title": "陌野乡墅：这也许是每个人都幻想过的Dream House",
                    "cover": "http://mmbiz.qpic.cn/mmbiz/tDsnpp1NDxqxZx14EXZdicE67eGiaAhq1vg8wUicmUB4iaOOVhCzACEibjP9Z8tOTjebdglDbXiaAANs51u1MNLXKL8w/0?wx_fmt=jpeg",
                    "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=403380281&idx=1&sn=26426574a160f4a3b2faf91b0623df9f&scene=19#wechat_redirect",
                    "digest": "它可能是莫干山包栋最具性价比的民宿了。",
                    "appmsgid": 403380281,
                    "itemidx": 1,
                    "type": 6
                },
                {
                    "aid": "505024819_1",
                    "title": "墨田：去莫干山避暑，茶园竹林漂流的清凉还不够，这家民宿用本真生活打动你",
                    "cover": "http://mmbiz.qpic.cn/mmbiz/tDsnpp1NDxq0nPSsFpOGEia9h1AC50qGv2Wp8wfuicDMmlcP4Ms9b4wZLWmqxKn8mQ8QWiczsS2FkOWozkBFicFWJQ/0?wx_fmt=jpeg",
                    "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=505024819&idx=1&sn=cffe8785ae379c3df41b0cbc00e60693&scene=19#wechat_redirect",
                    "digest": "东方传统文化，自然乡土生活。",
                    "appmsgid": 505024819,
                    "itemidx": 1,
                    "type": 6
                },
                {
                    "aid": "403696504_1",
                    "title": "蕨宿：谁会在不惑之年扔掉铁饭碗，跑到莫干山上造秘密花园？",
                    "cover": "http://mmbiz.qpic.cn/mmbiz/tDsnpp1NDxoOWUwX4wVTycq2YlXeVoU26gAQ3eDQdsSjyj77ahL0J1FTqoQibkSEZ7OrnS30G3DtMJ3Y9js6J0A/0?wx_fmt=jpeg",
                    "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=403696504&idx=1&sn=a723ef77e54eb16d0d18d68d02970a41&scene=19#wechat_redirect",
                    "digest": "一个充满惊喜的女人渴望自己是山野里的蕨草，从此自由而恣意的生长。",
                    "appmsgid": 403696504,
                    "itemidx": 1,
                    "type": 6
                }
            ],
            datas: [
                  {
                      "aid": "2652512606_1",
                      "title": "这12间房躲在临安山下，排成一个小京都，日式静谧和峡谷激情相爱了",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323814&di=c73782dce518f3bdf5e59bba10ded64a&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160220%2Fmp59769915_1455974144064_13.jpeg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=2652512606&idx=1&sn=bdddf2cac403f4a076d0d2f47bab3865&scene=19#wechat_redirect",
                      "digest": "浙西大龙湾",
                      "appmsgid": 2652512606,
                      "itemidx": 1,
                      "type": 9
                  },
                  {
                      "aid": "505023564_1",
                      "title": "静庐：怎样才能睡到王凯……睡过的床？！",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323813&di=14ec42c377cd957efaf321640939fdeb&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160627%2Fb6b4375e564441c8ab51c674fc68754f_th.jpg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=505023564&idx=1&sn=bb54c624038b61a24052e773c7b4988e&scene=19#wechat_redirect",
                      "digest": "睡男神睡过的床，泡男神泡过的浴缸！",
                      "appmsgid": 505023564,
                      "itemidx": 1,
                      "type": 6
                  },
                  {
                      "aid": "402651802_1",
                      "title": "岩朵：在风景如画的岩朵，翠绿青山只是背景，体验的不仅仅是那一刻度假的轻松。",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323813&di=d3e7a90cac081e22244f1dad428e7593&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160227%2Fmp60786630_1456512511181_5.jpeg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=402651802&idx=1&sn=c665804c9abe06c8c8557a4fa62c7b21&scene=19#wechat_redirect",
                      "digest": "在岩朵，体验的不仅仅是那一刻度假的轻松。这里有小鲜肉烧的一手好菜这就是岩朵，承载着一群爱玩的年轻人的梦想。",
                      "appmsgid": 402651802,
                      "itemidx": 1,
                      "type": 6
                  },
                  {
                      "aid": "403676409_1",
                      "title": "白描：刻意精致和人间烟火的微妙平衡，这家杭州郊区的民宿找到了",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323813&di=63403c764903e0dfad05153f645d083a&imgtype=0&src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20165_29_20%2Fa32z0x4141795153352.jpg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=403676409&idx=1&sn=521f53022674a52033f3902b9d62cb60&scene=19#wechat_redirect",
                      "digest": "阳春白雪和下里巴人都有了，不必挑。",
                      "appmsgid": 403676409,
                      "itemidx": 1,
                      "type": 6
                  },
                  {
                      "aid": "2652518202_1",
                      "title": "套路太深！杭州景区里新开的这家民宿，竟神秘得连本地人都找不到！",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323813&di=8f56f46fa04c4313552a8dc78a840191&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160519%2F038c6be95a02495caa59a44d4bbcb558_th.jpg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=2652518202&idx=1&sn=ccef8bdd20da722e1e02105e4a36a120&scene=19#wechat_redirect",
                      "digest": "茶田里的深度睡眠",
                      "appmsgid": 2652518202,
                      "itemidx": 1,
                      "type": 9
                  },{
                      "aid": "2652518202_2",
                      "title": "套路太深！杭州景区里新开的这家民宿，竟神秘得连本地人都找不到！",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323813&di=8f56f46fa04c4313552a8dc78a840191&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160519%2F038c6be95a02495caa59a44d4bbcb558_th.jpg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=2652518202&idx=1&sn=ccef8bdd20da722e1e02105e4a36a120&scene=19#wechat_redirect",
                      "digest": "茶田里的深度睡眠",
                      "appmsgid": 2652518202,
                      "itemidx": 1,
                      "type": 9
                  },{
                      "aid": "2652518202_3",
                      "title": "套路太深！杭州景区里新开的这家民宿，竟神秘得连本地人都找不到！",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323813&di=8f56f46fa04c4313552a8dc78a840191&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160519%2F038c6be95a02495caa59a44d4bbcb558_th.jpg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=2652518202&idx=1&sn=ccef8bdd20da722e1e02105e4a36a120&scene=19#wechat_redirect",
                      "digest": "茶田里的深度睡眠",
                      "appmsgid": 2652518202,
                      "itemidx": 1,
                      "type": 9
                  },{
                      "aid": "2652518202_4",
                      "title": "套路太深！杭州景区里新开的这家民宿，竟神秘得连本地人都找不到！",
                      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491394323813&di=8f56f46fa04c4313552a8dc78a840191&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160519%2F038c6be95a02495caa59a44d4bbcb558_th.jpg",
                      "link": "http://mp.weixin.qq.com/s?__biz=MzAwNDE4NTcwNw==&mid=2652518202&idx=1&sn=ccef8bdd20da722e1e02105e4a36a120&scene=19#wechat_redirect",
                      "digest": "茶田里的深度睡眠",
                      "appmsgid": 2652518202,
                      "itemidx": 1,
                      "type": 9
                  }
              ]
        }
        this.getItemViews = this.getItemViews.bind(this);
        this.getSpringItemViews = this.getSpringItemViews.bind(this);
    }

    componentDidMount(){
        document.title = '几何民宿';
        let _this = this;
    }

    getItemViews(){
      return _.map(this.state.listDatas,function(item){
        return (
            <li key={item.aid}>
              <img src = {item.cover} alt=""/>
              <p>{item.title}</p>
              <span className="price">￥ {item.type}</span>
              <span className="oldPrice" style={{display: item.oldPrice ? "inline-block" : "none"}}>￥{item.oldPrice}</span>
            </li>
        )
      })
    }

    getSpringItemViews(){
      return _.map(this.state.datas,function(item){
        return(
          <li key={item.aid}>
            <img src={item.cover} alt=""/>
            <p>{item.title}</p>
            <span className="price">￥ {item.type}</span>
            <span className="oldPrice" style={{display: item.oldPrice ? "inline-block" : "none"}}>￥{item.oldPrice}</span>
          </li>
        )
      })
    }

    render() {
        return (
            <App active="youxi">
                <div>
                  <section className="shopperowner">
                    <h3>店长推荐</h3>
                    <ul>
                      {this.getItemViews()}
                    </ul>
                  </section>

                  <section className="spring">
                    <h3>春季.亲子游</h3>
                    <ul>
                      {this.getSpringItemViews()}
                    </ul>
                  </section>
                </div>
            </App>
        )
    }

}
