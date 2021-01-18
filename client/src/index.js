import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import store from './redux/store'
import App from './App';
import 'antd/dist/antd.less';
import {localGet} from './utils/localStorage'
import memory from './utils/memory'
//一开始就把localStorage的值赋给memory
memory.user = localGet()

ReactDOM.render((
	<Provider store={store}>
		<App/>
	</Provider>
),document.getElementById('root'));

