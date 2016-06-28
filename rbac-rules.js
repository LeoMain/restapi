module.exports = {
	roles: {
		'guest': {
		},
		'user': {
			permissions: ['read', 'create', 'update', 'delete'],
			inherited  : ['guest']
		},
		'test': {
			permissions: ['delete'],
			inherited  : ['guest']
		},
		'admin': {
			permissions: ['manage']
		}
	}
};