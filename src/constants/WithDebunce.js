import React from 'react';
import * as _ from 'underscore';

export default(WrappedComponent)=> {
    class withDebunce extends React.PureComponent {
        constructor(props){
            super(props);
            this.debounceEvent  = _.debounce(this.debounceFun,1000, true);
        }

        debounceFun =(fun) =>{
            if(fun!== undefined){
                console.log('Debounce...Block')
                fun()
            }
        }
        render () {
            return <WrappedComponent {...this.props} debounceEvent={this.debounceEvent} />
        }
    }
    return withDebunce;
};