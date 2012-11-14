(function(){
	// Common Variables
	var doc_body	= document.getElementsByTagName('body')[0],
		doc_head 	= document.getElementsByTagName('head')[0],
		wmq_styles 	= document.getElementById('wmq_styles'),
		wmq_div 	= document.getElementById('wmq');
	if( wmq_styles == null ){
		// Append parent <div>
		wmq_div = document.createElement('div');
		wmq_div.id = 'wmq';
		the_body = doc_body.appendChild(wmq_div);
		// Stylesheet magic
		var doc_styles = document.styleSheets,
		style_rules, wmq_stylesheet, new_style_rule, new_style_rules, media_rule, random_value, hsla_num, random_hsla, random_bg, random_border, count = 0;
		wmq_stylesheet = document.createElement('style');
		wmq_stylesheet.type = 'text/css';
		wmq_stylesheet.id = 'wmq_styles';
		new_style_rule = [
			'#wmq{',
				'width:100%;',
				'height:1px;',
				'background:none;',
				'position:fixed;',
				'bottom:30%;',
				'z-index:10000;',
			'}',
			'#wmq:before {',
				'content: "No Media Query";',
				'display:block;',
				'background-color:rgba(0,0,0,0.9);',
				'position: absolute;',
				'bottom: 0;',
				'z-index:20000;',
				'width: 100%;',
				'padding:10px 0 15px;',
				'font-family:"Gill Sans";',
				'color: #fff;',
				'font-size: 28px;',
				'line-height:28px;',
				'text-align: center;',
				'text-shadow:0 1px 0 rgba(0,0,0,0.3);',
				'-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.2);',
				'-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.2);',
				'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQIHWP8//8/AxLwYQAJQLEPWBKZAxMAy0AlGACQ7igLLJXp3AAAAABJRU5ErkJggg==);',
			'}',
			'#wmq:after{',
				'content: attr(data-wmq-viewport) "  /  " attr(data-wmq-window);',
				'display:block;',
				'background-color:rgba(0,0,0,0.9);',
				'position: absolute;',
				'top: 1px;',
				'width:100%;',
				'z-index:10000;',
				'padding:5px 0;',
				'font-family:"Gill Sans";',
				'color: #fff;',
				'font-size: 16px;',
				'text-align: center;',
				'text-shadow:0 1px 0 rgba(0,0,0,0.3);',
				'-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.2), 0 2px 5px rgba(0,0,0,0.5);',
				'-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.2), 0 2px 5px rgba(0,0,0,0.5);',
				'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQIHWP8//8/AxLwYQAJQLEPWBKZAxMAy0AlGACQ7igLLJXp3AAAAABJRU5ErkJggg==);',
				'white-space: pre;',
			'}'
		].join('');
		new_style_rules = document.createTextNode(new_style_rule);
		wmq_stylesheet.appendChild(new_style_rules);
		for( i=0; i<doc_styles.length; i++ ){
			style_rules = doc_styles[i].cssRules;
			if( style_rules ){
				for( j=0; j<style_rules.length; j++ ){
					if( style_rules[j].type == CSSRule.MEDIA_RULE) {
						media_rule = style_rules[j].cssText.match(/@media(.*) {/);
						if( media_rule && media_rule[1] ){
							count++;
							hsla_num = (Math.floor(Math.random() * 360));
							random_hsla = 'hsla('+hsla_num+',50%,30%';
							random_bg = random_hsla +", 0.9)";
							random_border = random_hsla +", 1)";
							new_style_rule = [ media_rule[0],
									'#wmq:before{',
										'content: "'+ media_rule[1] +'";',
										'background-color:'+ random_bg +';',
										'border-top: 1px solid '+ random_border +';',
										//'border-bottom: 1px solid '+ random_border +';',
									'}',
									'#wmq:after{',
										'background-color:'+ random_bg +';',
										'border-top: 1px solid '+ random_border +';',
										'border-bottom: 1px solid '+ random_border +';',
									'}',
								'}'].join('');
							new_style_rules = document.createTextNode(new_style_rule);
							wmq_stylesheet.appendChild(new_style_rules);
						}
					}
				}
			}
		}
		doc_head.appendChild(wmq_stylesheet);
		calculate_size();
		window.onresize = function(){ calculate_size(); }
		console.log('Media Query Count: '+count);
	}else{
		doc_body.removeChild(wmq_div);
		doc_head.removeChild(wmq_styles);
	}
	function calculate_size(event){
		var window_iw, window_ih, window_ow, window_oh, window_size, viewport_size, wmq_div;
		window_iw = window.innerWidth;
		window_ih = window.innerHeight;
		window_ow = window.outerWidth;
		window_oh = window.outerHeight;
		viewport_size = 'Viewport Size: '+window_iw+' x '+window_ih;
		window_size = 'Window Size: '+window_ow+' x '+window_oh;
		wmq_div = document.getElementById('wmq');
		wmq_div.setAttribute('data-wmq-viewport', 'Viewport: '+window_iw+' x '+window_ih);
		wmq_div.setAttribute('data-wmq-window', 'Window: '+window_ow+' x '+window_oh);
	}	
})();