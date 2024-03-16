import config from '../../../api/config';
import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';

Page({
    data: {		
		cdn: config.cdn,

		nowTab: 'QQ',
    },

	changeTabs(e) {
		this.setData({
			'nowTab': e.detail.value,
		})
	},
})