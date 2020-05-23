import React from 'react';
interface IProps {
   
}

/** 加载按钮组件 */
class BaseBtn extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
    }

    render() {
        return (
            <form className="form-inline">
                <button type="button" className="btn btn-primary glyphicon glyphicon-plus" onClick={() => this.props.execute('add')}>
                    <span className="btn-val-svg">
                        <svg className="bi bi-plus" margin-top="" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" clipRule="evenodd" />
                        </svg>
                                添加
                            </span>
                </button>&nbsp;
                <button type="button" id="btn-delete" className="btn btn-danger glyphicon glyphicon-plus" onClick={() => this.props.execute('delete')}>
                    <span className="btn-val-svg">
                        <svg className="bi bi-dash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z" clipRule="evenodd" />
                        </svg>
                                删除
                            </span>
                </button>&nbsp;
                <button type="button" id="btn-edit" className="btn btn-warning glyphicon glyphicon-plus" onClick={() => this.props.execute('edit')}>
                    <span className="btn-val-svg">
                        <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" clipRule="evenodd" />
                        </svg>
                                修改
                            </span>
                </button>&nbsp;
                <button type="button" id="btn-info" className="btn btn-info glyphicon glyphicon-plus" onClick={() => this.props.execute('info')}>
                    <span className="btn-val-svg">
                        <svg className="bi bi-info" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                            <circle cx="8" cy="4.5" r="1" />
                        </svg>查看</span></button>&nbsp;
                <button type="button" id="btn-info" className="btn btn-info glyphicon glyphicon-plus" onClick={() => this.props.execute('export')}>
                    <span className="btn-val-svg">
                        <svg className="bi bi-info" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                            <circle cx="8" cy="4.5" r="1" />
                        </svg>导出</span></button>
            </form>
        )
    }
}
export default BaseBtn;