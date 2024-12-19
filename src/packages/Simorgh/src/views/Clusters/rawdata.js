const devices = [
	{
		region: 1,
		zone: 1,
		ip: '192.168.1.1',
		name: 'sdb1',
		association: [
			{
				product: 'mc',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 1,
		ip: '192.168.1.2',
		name: 'sdb1',
		association: [
			{
				product: 'mc',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 1,
		ip: '192.168.1.2',
		name: 'sdb2',
		association: [
			{
				product: 'mc',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 1,
		ip: '192.168.1.3',
		name: 'sdb1',
		association: [
			{
				product: 'mc',
				cluster: 'm-cluster1',
			},
		],
	},

	{
		region: 1,
		zone: 1,
		ip: '192.168.1.3',
		name: 'sdb2',
		association: [
			{
				product: 'mc',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 2,
		ip: '192.168.1.1',
		name: 'sdb1',
		association: [
			{
				product: 'monster',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 2,
		ip: '192.168.1.2',
		name: 'sdb1',
		association: [
			{
				product: 'monster',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 2,
		ip: '192.168.1.2',
		name: 'sdb2',
		association: [
			{
				product: 'monster',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 3,
		ip: '192.168.1.1',
		name: 'sdb1',
		association: [
			{
				product: 'monster',
				cluster: 'm-cluster1',
			},
			{
				product: 'mc',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 3,
		ip: '192.168.1.2',
		name: 'sdb1',
		association: [
			{
				product: 'mc',
				cluster: 'm-cluster1',
			},
		],
	},
	{
		region: 1,
		zone: 3,
		ip: '192.168.1.2',
		name: 'sdb2',
		association: [
			{
				product: 'monster',
				cluster: 'm-cluster1',
			},
		],
	},
];

export { devices };
