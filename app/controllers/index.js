
// Android only
if (OS_ANDROID) {
	// Load module
	var TiDrawerLayout = require('com.tripvi.drawerlayout');
	
	// define menu and main content view
	var menuTable = Alloy.createController('menu').getView();
	var contentView = Alloy.createController('main').getView();
	
	var drawer = TiDrawerLayout.createDrawer({
	        leftView: menuTable,
	        centerView: contentView,
	        leftDrawerWidth: menuWidth,
	        width: Ti.UI.FILL,
	        height: Ti.UI.FILL
	});

	$.headerbar.setParentContainer($.index);            // a reference to the window containing the widget
	$.headerbar.setBackground({                         // background color of the bar
	    color:'#cacaca'
	});	

	$.headerbar.setTitle({                              // the title of the containing window
	    text:'Window Title'
	});
	$.headerbar.setBack(function(){                     // if angle is shown, what will happen uppon click.  Default to closing containing window
	    drawer.toggleLeftWindow();
	});
	
	$.headerbar.setBlackBurger();
	$.headerbar.showBurger();	

	drawer.addEventListener('drawerslide', function(e) {        
		$.headerbar.setBurgerWidth(e.offset);
	});	
	
	$.mainWindow.add(drawer);
	$.mainWindow.open();
	
}
