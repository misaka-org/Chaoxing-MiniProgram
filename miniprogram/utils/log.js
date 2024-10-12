const log = wx.getRealtimeLogManager();

module.exports = {
	debug() {
		if (!log) return
		log.debug.apply(log, arguments)
		console.info(...arguments)
	},
	info() {
		if (!log) return
		log.info.apply(log, arguments)
		console.info(...arguments)
	},
	error() {
		if (!log) return
		log.error.apply(log, arguments)
		console.error(...arguments)
	}
}