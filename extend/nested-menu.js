module.exports = (handlebars) => {
	handlebars.registerHelper('nestedMenu', (menu) => {

		// Flatten all objects to a single level (remove children)
		const flattenedMenu = [];

		for (let i = 0; i < menu.length; i += 1) {
			const menuItem = JSON.parse(JSON.stringify(menu[i]));
			const children = menuItem.children;
			delete menuItem.children;

			flattenedMenu.push(menuItem);

			for (let c = 0; c < children.length; c += 1) {
				flattenedMenu.push(children[c]);
			}
		}

		const nestedMenu = [];
		var sectionreferenceURI;

		for (let i = 0; i < flattenedMenu.length; i += 1) {
			const parentItem = flattenedMenu[i];

			if (parentItem.depth > 1) {
				continue;
			}
			if (parentItem.depth == 1 ) {
				sectionreferenceURI = parentItem.referenceURI;
			}
			section = sectionreferenceURI;

			parentItem.children = getChildren(parentItem, section);
			nestedMenu.push(parentItem);
		}

		function getChildren(parentItem, section) {
			const children = [];
			for (let i = 0; i < flattenedMenu.length; i += 1) {
				const child = flattenedMenu[i];

				// It's the same item, so ignore
				if (child.referenceNumber === parentItem.referenceNumber) {
					continue;
				}

				// If it doesn't start with the reference number, then ignore
				if (child.referenceNumber.indexOf(parentItem.referenceNumber) !== 0) {
					continue;
				}

				// We've gone too deep
				if (child.depth > parentItem.depth + 1) {
					continue;
				}

				// We've reached a sibling level, so there aren't any more of these now
				if (child.depth === parentItem.depth) {
					break;
				}

				child.parentreferenceURI = parentItem.referenceURI;



				child.sectionreferenceURI = section;
				child.children = getChildren(child, section);
				children.push(child);
			}

			return children;
		}

		return nestedMenu;
	});
};