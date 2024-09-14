import randoms from "@/utils/randoms";
import toast, { ToastDefination, ToastButton, Toast } from "./toast";

import I from "@/components/util/I.vue";


function dev_toast_used (_event: MouseEvent, toast: Toast) {
	toast.remove_this();
}

export function gen_randomToast (): ToastDefination {
	
	return {
		
		type: randoms.one(
			undefined,
			toast.types.ERROR,
			toast.types.DEV,
			toast.types.WARN
		),
		icon: randoms.one(
			undefined, undefined, undefined, undefined, undefined, undefined,
			"nf-fa-500px", "nf-fa-500px", "nf-dev-github"
		),
		
		text: randoms.one<string|JSX.Element>(
			"一个随机的吐司面包。",
			"这是一个测试用的吐司面包。它用于一直显示在界面上以便于调试时调整 Toast 样式等等。它无法通过普通的方式被关闭。",
			"It seems some problems occurred...",
			"我可以吞下玻璃而不伤身体。",
			"买了一箱，已经在😭了",
			"有个小朋友 Segmentation Fault 了也不知道哪里来的自信，一口咬定是机器的问题。给他换了机器，并且教育了他机器永远是对的。这个小插曲体现了编程的基础教育还有很大的缺憾，使得竞赛选手大多都缺少真正的 “编程” 训练，我看他们对着那长得要命的 if (...dp[a][b][c][d][e][f][n^1]...) 调的真叫一个累，让我不由得想起若干年前某 NOI 金牌选手在某题爆零后对着一行有 20 个括号的代码哭的场景。",
			"显示一条随机样式和随机内容的吐司通知！",
			<><big>现在已经可以使用 JSX 富文本了哦。</big><br/>通过 <i>JSX 富文本格式</i> 实现更加特色的 Toast 消息吧。甚至还可以使用 Vue 模板像是 <I i='nf-fa-500px'></I> 图标哦！</>
		),
		
		clearTimeout: randoms.one(7000, 7000, 7000, 7000, 7000, 7000, 0, undefined, undefined, 2000, 2000),
		
		buttons: randoms.some<ToastButton>(
			{ icon: "nf-fa-refresh", onclick: dev_toast_used },
			{ icon: "nf-md-message_alert", onclick: dev_toast_used },
			{ icon: "nf-fa-bug", onclick: dev_toast_used },
			{ icon: "nf-fa-cloud_upload", onclick: dev_toast_used },
			{ icon: "nf-md-tools", onclick: dev_toast_used }
		),
		checkedButton: randoms.one(
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			null,
			null,
			null,
			null,
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close"
		)
	}
	
}
