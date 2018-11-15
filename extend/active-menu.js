module.exports = (handlebars) => {
	handlebars.registerHelper('activeMenu', (menu) => {
		const nestedMenu = handlebars.helpers.nestedMenu.apply(this, [menu]);

		function getActiveMenu(menuItems) {
			for (let i = 0; i < menuItems.length; i += 1) {
				const menuItem = menuItems[i];

				if (menuItem.isActive) {
					//console.log(menuItem);
					return menuItem;
				}


				//gets child menu items nested menu
				const activeMenu = getActiveMenu(menuItem.children);

				if (activeMenu) {


					var section = activeMenu.sectionreferenceURI;


					for (let i = 0; i < nestedMenu.length; i += 1) {
						if (nestedMenu[i].referenceURI == section) {

							return nestedMenu[i];
						}
					}

					return activeMenu;
				}


			}

			return null;
		}

		return getActiveMenu(nestedMenu);
	});
};