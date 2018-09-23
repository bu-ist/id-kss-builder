module.exports = (handlebars) => {
	handlebars.registerHelper('activeMenu', (menu) => {
		const nestedMenu = handlebars.helpers.nestedMenu.apply(this, [menu]);

		function getActiveMenu(menuItems) {
			for (let i = 0; i < menuItems.length; i += 1) {
				const menuItem = menuItems[i];

				if (menuItem.isActive) {
					return menuItem;
				}

				const activeMenu = getActiveMenu(menuItem.children);

				if (activeMenu) {
					return activeMenu;
				}
			}

			return null;
		}

		return getActiveMenu(nestedMenu);
	});
};