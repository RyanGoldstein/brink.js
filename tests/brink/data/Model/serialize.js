describe('serialize', function () {

	it('should properly serialize default values.', function (done) {

		var json,
			Model,
			expected,
			instance;

		Model = $b.Model({
            a : $b.attr({defaultValue : 'a'}),
            b : $b.attr({defaultValue : 'b'}),
            c : $b.attr({defaultValue : 'c'})
		});

		instance = Model.create();

		expected = {a : 'a', b : 'b', c : 'c'};
		json = instance.serialize();

		expect(json).to.deep.equal(expected);

		done();
	});

	it('should properly serialize nested keys.', function (done) {

		var json,
			Model,
			expected,
			instance;

		Model = $b.Model({
            a : $b.attr({key : 'a.b.c.d'})
		});

		instance = Model.create();
		instance.a = 'test';

		expected = {
			a : {
				b : {
					c : {
						d : 'test'
					}
				}
			}
		};

		json = instance.serialize();
		expect(json).to.deep.equal(expected);

		done();
	});
});
