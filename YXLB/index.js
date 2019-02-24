import React, { Component } from 'react'
import { render } from 'react-dom'
import { SingleImgView } from './src/index.js'
// import ImageView from 'react-imageview'

// import 'react-imageview/dist/react-imageview.css'
import Mlogger from '@tencent/mlogger'

class Main extends Component {
    constructor(){
        super();
        Mlogger.init({});
    }

    render() {
        let imagelist = [
            'img/01.jpg',
            'img/02.jpg',
            'img/03.jpg',
            'img/04.jpg',
            'img/05.jpg',
            'img/06.jpg',
            'img/07.jpg',
            'img/08.jpg',
            'img/09.jpg',
            'img/10.jpg',
        ];

        return (
            <div>
                <h3 className="title">Click image to open the viewer.</h3>
                <ul className="gallery">
                { imagelist.map((item, i)=>{
                    return (<li key={i}><img className="pic" src={item} onClick={this.show.bind(this, imagelist, i)}/></li>)
                })}
                </ul>  
            </div>
        )
    }

    show(imagelist, current){
        SingleImgView.show({
            imagelist,
            current,
            maxScale: 3,
            close: ()=>{SingleImgView.hide()},
            initCallback: ()=>{
                // 禁止右滑关闭webview
                // if(mqq){
                //     mqq.ui.setWebViewBehavior({
                //         swipeBack: 0
                //     });

                //     // 禁用系统的长按功能(如果没有配置长按事件则启用系统长按事件)
                //     if (mqq.compare('5.8') > -1) {
                //         mqq.invoke('ui', 'disableLongPress', {
                //             enable: true
                //         });
                //     } else if (mqq.compare('5.8') > -1) {
                //         mqq.invoke('ui', 'disableLongPress', {
                //             enable: false
                //         });
                //     }
                // }
            }
        })
    }
}

render(
    <Main />,
    document.getElementById('app')
)
