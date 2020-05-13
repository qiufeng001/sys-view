import React from 'react';

/** 加载按钮组件 */
class LoadBtn extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
     return(
        <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
        </button>
     )
    }
  }
  export default LoadBtn;