/**
 * Created by Yuicon on 2017/6/25.
 */
import '../../static/style/framework/Header.css';
import React from 'react';
import jQuery from "jquery";

interface IProps {
    isOpen: boolean
}

class Header extends React.Component<any, IProps> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect = (index: any) => {
        alert(index)
        console.log("handleSelect");
    };

    menuClick = () => {
        alert(1)
    };

    login = (val) => {
        alert(this.state.isOpen)
    };

    register = (val) => {
        alert(val)
    }


    render() {

        jQuery(() => {
            
            jQuery("#menuTree a").click(function (this) {
                var url = jQuery(this).attr("href");
                var menuName = jQuery(this).attr("data-menuName");
                //异步刷新页面方法
                if (url != '#') {
                    //$("#loadPageContent").html("正在加载页面ing......");
                    //异步刷新页面
                    ajaxMenuLoadPage("#loadMainContent", url);
                    //清楚menuTree选中样式
                    jQuery("#menuTree li").each(function (index) {
                        if (jQuery(jQuery("#menuTree li")).hasClass("open")) {
                            jQuery(jQuery("#menuTree li")).removeClass("open");
                        }
                        if (jQuery(jQuery("#menuTree li")).hasClass("active")) {
                            jQuery(jQuery("#menuTree li")).removeClass("active");
                        }
                    });
                    //收起所有打开的ul下的li标签
                    jQuery("#menuTree ul").each(function (index) {
                        jQuery(jQuery("#menuTree ul")).css("display", "none");
                    });
                    //选中的li添加样式
                    var $li = jQuery(this).parent();
                    $li.addClass("active");
                   jQuery(this).parents().each(function (obj) {
                        if (obj.get(0).tagName = "UL") {
                            //打开当前ul下的li标签
                            jQuery($li).css("display", "block");
                        }
                        if (jQuery(obj).get(0).tagName == "LI") {
                            jQuery(obj).addClass("active").addClass("open");
                        }
                    });
                    return false;
                };

            });
        });

        //异步加载页面
        function ajaxMenuLoadPage(areaId, url) {
            jQuery.post("www.baidu.com", function(result) {
                jQuery(areaId).html(result).hide().fadeIn('fast');
            });
            // jQuery(areaId).attr("src", url);
        }

        return (
            <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar headerMain" >
                <div className="navbar-nav-scroll">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link " href="/">首页</a>
                        </li>
                        <li id="markImg">
                            <img height="40px;" width="120px;" src={require('../../static/imgs/mark.jpg')} />
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav" id="menuTree">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">v4.4  </a>
                        <ul className="dropdown-menu" aria-labelledby="bd-versions">
                            <a className="dropdown-item" href="/login" itemID="1">百度</a>
                            <a className="dropdown-item" href="#" itemID="2">v3 版本</a>
                            <a className="dropdown-item" href="#" itemID="3">v2 版本</a>
                            <a className="dropdown-item" href="#" itemID="4">所有版本</a>
                        </ul>
                    </li>
                </ul>
                <ul className="navbar-nav ml-md-auto">
                    <li><a className="nav-item nav-link loginLink" type="button" onClick={() => this.login("login")}>登录</a></li>
                    <li><a className="nav-item nav-link registerLink" type="button" onClick={() => this.register("register")}>注册</a></li>
                </ul>
            </header>
        )
    }
}

export default Header;