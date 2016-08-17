import React from 'react';
import { Route } from 'react-router';

export default (
	<Route path="/" getComponent={(nextState, cb) => {
		require.ensure([], function(require) {
			cb(null, require('../TodoWithReduxApp').default);
		});
	}}
	>
		<Route path="todolist" getComponent={(nextState, cb) => {
			require.ensure([], function (require) {
	      cb(null, require('../components/TodoList/').default);
	    });
		}}
		>
			<Route path="intro" getComponent={(nextState, cb) => {
				require.ensure([], function (require) {
	      	cb(null, require('../components/Intro/').default);
	    	});
			}}
			/>
			<Route path="page" getComponent={(nextState, cb) => {
				require.ensure([], function (require) {
	      	cb(null, require('../components/Page/').default);
	    	});
			}}
			/>
		</Route>
	</Route>
);
