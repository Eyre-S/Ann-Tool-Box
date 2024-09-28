export default {
	
	writeClipboardMessage: (text: string) => <>已复制到剪贴板：<br/><small>{text}</small></>,
	
	filesystem: {
		
		open_in_file_manager: {
			
			success: () => <>已在文件管理器中打开：。</>,
			error: {
				empty_path: () => <>无法打开此路径：路径为空</>,
				unknown: (e: any) => <>无法打开此路径：未知后端错误<br/>{e}</>
			}
			
		}
		
	}
	
}
