describe("destruction", function () {

	it("should run the destroy method", function (done) {

		var TestClass = SubClass.extend({

			init : function () {
				this.initialized = true;
			},

			destroy : function () {

				var p;

				this.x = this.y = this.z = null;
				this.initialized = false;

				expect(this.x).to.not.be.ok;
				expect(this.y).to.not.be.ok;
				expect(this.z).to.not.be.ok;
				expect(this.initialized).to.not.be.ok;

				this._super();

				done();
			}
		});

		var testInstance = new TestClass();

		expect(testInstance).to.be.an.instanceof(SubClass);
		expect(testInstance).to.be.an.instanceof(Brink.Class);

		testInstance.destroy();
	});

	it("should unsubscribe to all notifications", function (done) {

		var TestClass = SubClass.extend({
			
			x : 0,
			y : 0,
			z : 0,

			init : function () {
				this.subscribe("test-1", function () {
					this.x = 1;
				});
				this.subscribe("test-2", function () {
					this.y = 2;
				});
				this.subscribe("test-3", function () {
					this.z = 3;
				});
			},

			destroy : function () {
				this._super();

				this.publish("test-1");
				this.publish("test-2");
				this.publish("test-3");

				expect(this.x).to.not.be.ok;
				expect(this.y).to.not.be.ok;
				expect(this.z).to.not.be.ok;

				done();
			}
		});

		var testInstance = new TestClass();

		expect(testInstance).to.be.an.instanceof(SubClass);
		expect(testInstance).to.be.an.instanceof(Brink.Class);

		testInstance.destroy();
	});
});
