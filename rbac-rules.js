module.exports = {
	roles: {
		'guest': {
		},
		'user': {
			permissions: ['read', 'create', 'update', 'delete','readComment', 
				'createComment', 'deleteComment'],
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