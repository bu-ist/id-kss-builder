module.exports = (handlebars) => {
	handlebars.registerHelper('sectionMenu', function(menu, referenceURI) {
		const nestedMenu = handlebars.helpers.nestedMenu.apply(this, [menu]);

		function getSectionMenu(menuItems) {

			for (let i = 0; i < menuItems.length; i += 1) {
				if (menuItems[i].referenceURI == referenceURI) {

					return menuItems[i];
				} else {

					//gets child menu items nested menu
					const childMenu = getSectionMenu(menuItems[i].children);

					if (childMenu) {


						var section = childMenu.referenceURI;


						for (let i = 0; i < nestedMenu.length; i += 1) {
							if (nestedMenu[i].referenceURI == section) {

								return nestedMenu[i];
							}
						}

						return childMenu;
					}
				}


			}
		}
		return getSectionMenu(nestedMenu);
	});
};