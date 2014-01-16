var backAction=null;
var burgerAction=null;
var extraButtonAction=null;
var parentWindow=null;

var buttonFactory=require(WPATH('button'));

// set default app icon, in case no icon is provided
$.appicon.backgroundImage='/appicon.png';	

function openInflater(evt){
	// need to code this part
	alert('Open the Inflater');
}

$.headerbar.addEventListener('click',function(evt){
	// this cancels the click event that get's fired 
	// when the parent window is clicked 
	evt.cancelBubble=true;
});

$.backbutton.addEventListener('click',function(evt){
	evt.cancelBubble=true;
});

$.backbutton.addEventListener('touchstart',function(evt){	
	this.backgroundColor="#000";
	this.opacity=0.2;
});

$.backbutton.addEventListener('touchend',function(evt){
	this.backgroundColor='transparent';
	this.opacity=1;
	if($.backangle.visible==true) {
		(!backAction)?parentWindow.close():backAction();
	} else if($.burger.visible==true) {
		burgerAction();	
	}	
});

function setTitle(args){
	$.headertitle.text=args.text;
	$.headertitle.color=args.color;
}

function setBack(action){
	backAction=action;
}

function setBurger(action){
	burgerAction=action;
}

function setBlackAngle(){
	$.backangle.backgroundImage=WPATH('light-back-angle.png');
}

function setWhiteAngle(){
	$.backangle.backgroundImage=WPATH('white-back-angle.png');
}

function setBlackBurger(){
	$.burger.backgroundImage=WPATH('ic_drawer_holo_dark.png');
}

function setWhiteBurger(){
	$.burger.backgroundImage=WPATH('ic_drawer_holo_light.png');
}

function hideAngle(){
	//$.backangle.width='0';
	$.backangle.visible=false;
}

function showAngle(){
	//$.backangle.width='14dp';
	$.backangle.visible=true;
}

function hideBurger(){
	$.burger.visible=false;
}

function showBurger(){
	$.burger.visible=true;
}

function setBurgerWidth(offset){
	var min = 13;
	var max = 20;

	var newWidth = max - ((max - min) * offset).toFixed();
	
	$.burger.width= newWidth;
}

function setAppIcon(icon){
	$.appicon.backgroundImage=icon;	
}

function setParentContainer(handle){
	parentWindow=handle;
}

function setBackground(args){
//	(args.image)?$.headerbar.backgroundImage=args.image:$.headerbar.backgroundImage=WPATH('lightbg.png');
	$.headerbar.backgroundColor=args.color;
	
	$.headerbar.backgroundRepeat= true;
}

function showBottomLine(){
	$.bottomline.visible=true;
}

function hideBottomLine(){
	$.bottomline.visible=false;
}

function setTop(top){
	this.headerbar.top=top;
}

function setActionButtons(args){
	if (args.visible){
		args.visible.forEach(function(button){
			var payload={
				image:button.icon,
				action: button.action,
				title: button.title
			};
			var tbbutton=buttonFactory.getButton(payload);
			$.actionButtons.add(tbbutton);
		});
	}

	if (args.inflater){
		var menuoptions='';
		var payload={
			image: WPATH('ic_menu_moreoverflow_normal_holo_light.png')
		};
		
		var inflater=buttonFactory.getButton(payload);
		args.inflater.forEach(function(button){
			// here I gather all the menu options and build a dropdown menu
			menuoptions+=button.title;
		});
		inflater.addEventListener('click',openInflater);
			
		$.actionButtons.add(inflater);
	}

	if (args.androidmenu){
		parentWindow.activity.onCreateOptionsMenu = function(e){
			var menu = e.menu;
			args.androidmenu.forEach(function(button){
				var menuItem = menu.add({ 
					title: button.title,
					icon: '/ic_menu_copy_holo_light.png',
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
				});
				menuItem.addEventListener("click", button.action);
			});
		};
	}
}

//
exports.setTop=setTop;
exports.setActionButtons=setActionButtons;
exports.showBottomLine=showBottomLine;
exports.hideBottomLine=hideBottomLine;
exports.setBackground=setBackground;
exports.setParentContainer=setParentContainer;
exports.setAppIcon=setAppIcon;
exports.hideAngle=hideAngle;
exports.showAngle=showAngle;
exports.setBlackAngle=setBlackAngle;
exports.setWhiteAngle=setWhiteAngle;
exports.hideBurger=hideBurger;
exports.showBurger=showBurger;
exports.setBlackBurger=setBlackBurger;
exports.setWhiteBurger=setWhiteBurger;
exports.setTitle=setTitle;
exports.setBack=setBack;
exports.setBurger=setBurger;
exports.setBurgerWidth=setBurgerWidth;