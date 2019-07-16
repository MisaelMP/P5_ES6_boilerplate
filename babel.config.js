
module.exports = function(api) {
	api.cache(true);

	const presets = [
		[
			"@babel/env",
			{
				targets: {
					"browsers": ["last 3 versions", "safari >= 8"]
				},
				useBuiltIns: "usage",
				corejs: "3.0.0",
			},
		]
	];

	return {
		presets
	};
}
