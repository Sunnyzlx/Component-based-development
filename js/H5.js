/* 内容管理对象 */
var H5 = function () {
	this.id = ('h5_' + Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [];
	$('body').append(this.el);

    /*新增一个页*/
	this.addPage =function(name, text){
      var page = $('<div class="h5_page section">');

      if (name != undefined) {
      	page.addClass('h5_page_' + name);
      }
      if (text != undefined) {
      	page.text(text);
      }
      this.page.push(page);
      this.el.append(this.page);
      if (typeof this.whenAddPage === 'function'){
          this.whenAddPage()
      }
      return this;
	}
	/*新增一个组件*/
	this.addComponent =function(name, cfg){
		var cfg = cfg || {};
		var page =this.page.slice(-1)[0];
		cfg = $.extend({
			type: 'base'
		},cfg);

		var component; //定义一个变量，存储 组件元素

        switch(cfg.type) {
        	case 'base':
        	    component = new H5ComponentBase(name, cfg);
        	    break;
            case 'polyline':
                component = new H5ComponentPolyline(name, cfg);
                break;
            case 'pie':
                component = new H5ComponentPie(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            case 'ring':
                component = new H5ComponentRing(name, cfg);
                break;
            case 'point':
                component = new H5ComponentPoint(name, cfg);
                break;
        	default:
        }

        page.append(component);
        return this;
	}
    this.loader =function(firstPage){
        this.el.fullpage({
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            },
            onLeave: function (index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            }

        });
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo(firstPage)
        }
    }
    this.loader = typeof H5_loading === 'function' ? H5_loading : this.loader;
	return this;
}
