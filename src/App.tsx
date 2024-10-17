import AppCover from './components/AppCover.vue';
import AppBody from './components/AppBody.vue';
import TitleBar from './components/title-bar/TitleBar.vue';

import config from './config';
import { open_devtools } from './app/app';
import { defineComponent } from 'vue';
import './App.less';
import { is } from './utils/fp';

export default defineComponent({
	
	setup: () => {
		
		if (config.dev.enabled.v.value == true && config.dev.open_devtools_on_launch.v.value) {
			open_devtools();
		}
		
		return () => (<>
			{is(!config.ui.use_native_frame.v_locked.value,
				<TitleBar></TitleBar>
			)}
			<div id="app-body-box">
				<AppBody></AppBody>
			</div>
			<AppCover></AppCover>
		</>)
		
	}
	
})
