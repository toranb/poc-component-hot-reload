/* jshint ignore:start */
define("dummy/templates/components/my-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/my-component.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("This is the *modified* template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  External state: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Increment");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("Internal state: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Increment");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Component action");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(fragment, [6]);
        var element3 = dom.childAt(element2, [3]);
        var element4 = dom.childAt(fragment, [10]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createAttrMorph(element1, 'onClick');
        morphs[3] = dom.createMorphAt(element2, 1, 1);
        morphs[4] = dom.createAttrMorph(element3, 'onClick');
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [8]), 0, 0);
        morphs[6] = dom.createAttrMorph(element4, 'onClick');
        morphs[7] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        return morphs;
      },
      statements: [["content", "message", ["loc", [null, [3, 5], [3, 16]]]], ["content", "externalCounter", ["loc", [null, [5, 18], [5, 37]]]], ["attribute", "onClick", ["subexpr", "action", ["incrementeExternalCounter"], [], ["loc", [null, [5, 54], [5, 92]]]]], ["content", "internalCounter", ["loc", [null, [7, 21], [7, 40]]]], ["attribute", "onClick", ["subexpr", "action", ["incrementeInternalCounter"], [], ["loc", [null, [7, 57], [7, 95]]]]], ["content", "message", ["loc", [null, [8, 5], [8, 16]]]], ["attribute", "onClick", ["subexpr", "action", ["myAction"], [], ["loc", [null, [9, 16], [9, 37]]]]], ["content", "yield", ["loc", [null, [10, 0], [10, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:end */
