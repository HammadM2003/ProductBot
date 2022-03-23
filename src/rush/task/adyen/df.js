export default function(window, document) {
    var _ = _ ? _ : {};
    _.X = function(b, c, e, a) {
        a = new(window.ActiveXObject ? ActiveXObject : XMLHttpRequest)("Microsoft.XMLHTTP");
        a.open(e ? "POST" : "GET", b, 1);
        e ? a.setRequestHeader("Content-type", "application/x-www-form-urlencoded") : 0;
        a.onreadystatechange = function() {
            a.readyState > 3 && c ? c(a.responseText, a) : 0;
        };
        a.send(e);
    };
    _.E = function(d, a, c, b) {
        if (d.attachEvent ? (b ? d.detachEvent("on" + a, d[a + c]) : !0) : (b ? d.removeEventListener(a, c, !1) : d.addEventListener(a, c, !1))) {
            d["e" + a + c] = c;
            d[a + c] = function() {
                d["e" + a + c](window.event);
            };
            d.attachEvent("on" + a, d[a + c]);
        }
    };
    _.G = function(a) {
        return a.style ? a : document.getElementById(a);
    };
    _.A = function(a, f, e, b, d) {
        if (b === undefined) {
            var b = new Object();
            b.value = 0;
        }
        b.value ? 0 : b.value = 0;
        return d.value = setInterval(function() {
            e(b.value / a);
            ++b.value > a ? clearInterval(d.value) : 0;
        }, f);
    };
    _.F = function(e, b, c, a) {
        e = e == "in";
        _.A(c ? c : 15, a ? a : 50, function(d) {
            d = (e ? 0 : 1) + (e ? 1 : -1) * d;
            b.style.opacity = d;
            b.style.filter = "alpha(opacity=" + 100 * d + ")";
        });
    };
    _.S = function(k, g, j, e, a, b, m) {
        k = k == "in";
        _.A(j ? j : 15, e ? e : 50, function(c) {
            c = (k ? 0 : 1) + (k ? 1 : -1) * c;
            g.style.width = parseInt(c * a) + "px";
        }, m, b);
    };
    _.Q = function(d) {
        var h = new Object();
        var c = new Array();
        for (var a = 0; a < d.elements.length; a++) {
            try {
                l = d.elements[a];
                n = l.name;
                if (n == "") {
                    continue;
                }
                switch (l.type.split("-")[0]) {
                    case "select":
                        for (var b = 0; b < l.options.length; b++) {
                            if (l.options[b].selected) {
                                if (typeof(h[n]) == "undefined") {
                                    h[n] = new Array();
                                }
                                h[n][h[n].length] = encodeURIComponent(l.options[b].value);
                            }
                        }
                        break;
                    case "radio":
                        if (l.checked) {
                            if (typeof(h[n]) == "undefined") {
                                h[n] = new Array();
                            }
                            h[n][h[n].length] = encodeURIComponent(l.value);
                        }
                        break;
                    case "checkbox":
                        if (l.checked) {
                            if (typeof(h[n]) == "undefined") {
                                h[n] = new Array();
                            }
                            h[n][h[n].length] = encodeURIComponent(l.value);
                        }
                        break;
                    case "submit":
                        break;
                    default:
                        if (typeof(h[n]) == "undefined") {
                            h[n] = new Array();
                        }
                        h[n][h[n].length] = encodeURIComponent(l.value);
                        break;
                }
            } catch (g) {}
        }
        for (x in h) {
            c[c.length] = x + "=" + h[x].join(",");
        }
        return c.join("&");
    };
    _.R = function(a) {
        ("\v" == "v" || document.documentElement.style.scrollbar3dLightColor != undefined) ? setTimeout(a, 0): _.E(document, "DOMContentLoaded", a);
    };

    function dfGetPlug() {
        var d = "";
        var j = 0;
        try {
            if (navigator.plugins) {
                var m = navigator.plugins;
                var o = [];
                for (var f = 0; f < m.length; f++) {
                    o[f] = m[f].name + "; ";
                    o[f] += m[f].description + "; ";
                    o[f] += m[f].filename + ";";
                    for (var c = 0; c < m[f].length; c++) {
                        o[f] += " (" + m[f][c].description + "; " + m[f][c].type + "; " + m[f][c].suffixes + ")";
                    }
                    o[f] += ". ";
                }
                j += m.length;
                o.sort();
                for (f = 0; f < m.length; f++) {
                    d += "Plugin " + f + ": " + o[f];
                }
            }
            if (d === "") {
                var b = [];
                b[0] = "QuickTime";
                b[1] = "Shockwave";
                b[2] = "Flash";
                b[3] = "WindowsMediaplayer";
                b[4] = "Silverlight";
                b[5] = "RealPlayer";
                var h;
                for (var a = 0; a < b.length; a++) {
                    h = PluginDetect.getVersion(b[a]);
                    if (h) {
                        d += b[a] + " " + h + "; ";
                        j++;
                    }
                }
                d += dfGetIEAV();
                j++;
            }
        } catch (g) {}
        var k = {
            nr: j,
            obj: d
        };
        return k;
    }

    function dfGetIEAV() {
        try {
            if (window.ActiveXObject) {
                for (var x = 2; x < 10; x++) {
                    try {
                        oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');");
                        if (oAcro) {
                            return "Adobe Acrobat version" + x + ".?";
                        }
                    } catch (ex) {}
                }
                try {
                    oAcro4 = new ActiveXObject("PDF.PdfCtrl.1");
                    if (oAcro4) {
                        return "Adobe Acrobat version 4.?";
                    }
                } catch (ex) {}
                try {
                    oAcro7 = new ActiveXObject("AcroPDF.PDF.1");
                    if (oAcro7) {
                        return "Adobe Acrobat version 7.?";
                    }
                } catch (ex) {}
                return "";
            }
        } catch (e) {}
        return "";
    }

    function dfGetFonts() {
        var h = "";
        try {
            try {
                var a = document.getElementById("df_jfh");
                if (a && a !== null) {
                    var c = a.getFontList();
                    for (var g = 0; g < c.length; g++) {
                        h = h + c[g] + ", ";
                    }
                    h += " (Java)";
                }
            } catch (b) {}
            if (h === "") {
                h = "No Flash or Java";
            }
        } catch (f) {}
        var d = {
            nr: h.split(",").length,
            obj: h
        };
        return d;
    }

    function dfInitDS() {
        try {
            localStorage.dfValue = "value";
        } catch (a) {}
        try {
            sessionStorage.dfValue = "value";
        } catch (a) {}
    }

    function dfGetDS() {
        var a = "";
        try {
            if (localStorage.dfValue === "value") {
                a += "DOM-LS: Yes";
            } else {
                a += "DOM-LS: No";
            }
        } catch (b) {
            a += "DOM-LS: No";
        }
        try {
            if (sessionStorage.dfValue === "value") {
                a += ", DOM-SS: Yes";
            } else {
                a += ", DOM-SS: No";
            }
        } catch (b) {
            a += ", DOM-SS: No";
        }
        return a;
    }

    function dfGetIEUD() {
        try {
            oPersistDiv.setAttribute("cache", "value");
            oPersistDiv.save("oXMLStore");
            oPersistDiv.setAttribute("cache", "new-value");
            oPersistDiv.load("oXMLStore");
            if ((oPersistDiv.getAttribute("cache")) == "value") {
                return ", IE-UD: Yes";
            } else {
                return ", IE-UD: No";
            }
        } catch (a) {
            return ", IE-UD: No";
        }
    }

    function getWebglFp() {
        var b = document.createElement("canvas");
        var g = null;
        try {
            g = b.getContext("webgl") || b.getContext("experimental-webgl");
        } catch (j) {
            return padString("", 10);
        }
        if (g === undefined || g === null) {
            return padString("", 10);
        }
        var m = [];
        var i = "attribute vec2 attrVert;varying vec2 varyTexCoord;uniform vec2 unifOffset;void main(){varyTexCoord=attrVert+unifOffset;gl_Position=vec4(attrVert,0,1);}";
        var d = "precision mediump float;varying vec2 varyTexCoord;void main() {gl_FragColor=vec4(varyTexCoord*0.55,0,1);}";
        var e = -0.7;
        var c = 0.7;
        var f = 0.2;
        var a = g.canvas.width / g.canvas.height;
        try {
            h(g, e, c, f, a);
            h(g, e + f, c - f * a, f, a);
            h(g, e + f, c - 2 * f * a, f, a);
            h(g, e, c - 2 * f * a, f, a);
            h(g, e - f, c - 2 * f * a, f, a);
        } catch (j) {}
        if (g.canvas !== null) {
            m.push(g.canvas.toDataURL() + "§");
        }
        try {
            m.push(g.getParameter(g.RED_BITS));
            m.push(g.getParameter(g.GREEN_BITS));
            m.push(g.getParameter(g.BLUE_BITS));
            m.push(g.getParameter(g.DEPTH_BITS));
            m.push(g.getParameter(g.ALPHA_BITS));
            m.push((g.getContextAttributes().antialias ? "1" : "0"));
            m.push(k(g.getParameter(g.ALIASED_LINE_WIDTH_RANGE)));
            m.push(k(g.getParameter(g.ALIASED_POINT_SIZE_RANGE)));
            m.push(k(g.getParameter(g.MAX_VIEWPORT_DIMS)));
            m.push(g.getParameter(g.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
            m.push(g.getParameter(g.MAX_CUBE_MAP_TEXTURE_SIZE));
            m.push(g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS));
            m.push(g.getParameter(g.MAX_RENDERBUFFER_SIZE));
            m.push(g.getParameter(g.MAX_TEXTURE_IMAGE_UNITS));
            m.push(g.getParameter(g.MAX_TEXTURE_SIZE));
            m.push(g.getParameter(g.MAX_VARYING_VECTORS));
            m.push(g.getParameter(g.MAX_VERTEX_ATTRIBS));
            m.push(g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            m.push(g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS));
            m.push(g.getParameter(g.RENDERER));
            m.push(g.getParameter(g.SHADING_LANGUAGE_VERSION));
            m.push(g.getParameter(g.STENCIL_BITS));
            m.push(g.getParameter(g.VENDOR));
            m.push(g.getParameter(g.VERSION));
            m.push(g.getSupportedExtensions().join(""));
        } catch (j) {
            return padString("", 10);
        }
        return m.join("");

        function h(t, q, p, r, o) {
            var u = new Float32Array([q, p, q, p - r * o, q + r, p - r * o, q, p, q + r, p, q + r, p - r * o]);
            var w = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, w);
            t.bufferData(t.ARRAY_BUFFER, u, t.STATIC_DRAW);
            w.itemSize = 2;
            w.numItems = u.length / w.itemSize;
            var s = t.createProgram();
            var v = t.createShader(t.VERTEX_SHADER);
            var y = t.createShader(t.FRAGMENT_SHADER);
            t.shaderSource(v, i);
            t.shaderSource(y, d);
            t.compileShader(v);
            t.compileShader(y);
            t.attachShader(s, v);
            t.attachShader(s, y);
            t.linkProgram(s);
            t.useProgram(s);
            s.vertexPosAttrib = t.getAttribLocation(s, "attrVert");
            s.offsetUniform = t.getUniformLocation(s, "unifOffset");
            t.enableVertexAttribArray(s.vertexPosArray);
            t.vertexAttribPointer(s.vertexPosAttrib, w.itemSize, t.FLOAT, !1, 0, 0);
            t.uniform2f(s.offsetUniform, 1, 1);
            t.drawArrays(t.TRIANGLE_STRIP, 0, w.numItems);
        }

        function k(o) {
            g.clearColor(0, 0.5, 0, 1);
            g.enable(g.DEPTH_TEST);
            g.depthFunc(g.LEQUAL);
            g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
            return o[0] + o[1];
        }
    }

    function getJsFonts() {
        var e = function() {
            return (new Date()).getTime();
        };
        var f = e() + 3000;
        try {
            var p = ["monospace", "sans-serif", "serif"];
            var h = "abcdefghijklmnopqrstuvwxyz";
            var r = "80px";
            var g = document.body || document.getElementsByTagName("body")[0];
            var o = document.createElement("span");
            o.style.fontSize = r;
            o.innerHTML = h;
            var q = {};
            var a = {};
            var j = 0;
            for (j = 0; j < p.length; j++) {
                o.style.fontFamily = p[j];
                g.appendChild(o);
                q[p[j]] = o.offsetWidth;
                a[p[j]] = o.offsetHeight;
                g.removeChild(o);
            }
            var k = ["Abril Fatface", "Adobe Caslon", "Adobe Garamond", "ADOBE GARAMOND PRO", "Affair", "Ailerons", "Alegreya", "Aller", "Altus", "Amatic", "Ambassador", "American Typewriter", "American Typewriter Condensed", "Americane", "Amsi Pro", "Andale Mono", "Anivers", "Anonymous Pro", "Arca Majora", "Archivo Narrow", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Arimo", "Arvo", "Asfalto", "Asia", "Audimat", "AvantGarde Bk BT", "AvantGarde Md BT", "Bank Gothic", "BankGothic Md BT", "Barkentina", "Baskerville", "Baskerville Old Face", "Bassanova", "Batang", "BatangChe", "Bauhaus 93", "Beauchef", "Bebas Neue", "Bellaboo", "Berlin Sans FB", "Berlin Sans FB Demi", "Betm", "Bitter", "Blackout", "Blox", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bomb", "Book Antiqua", "Bookman Old Style", "Bookshelf Symbol 7", "Bosque", "Bowling Script", "Box", "Brandon Text", "Brandon Text Medium", "Bree Serif", "Bremen Bd BT", "Britannic Bold", "Broadway", "Brooklyn Samuels", "Brotherhood Script", "Bukhari Script", "Burford", "Byker", "Cabin", "Caecilia", "Calibri", "Cambria", "Cambria Math", "Cathedral", "Century", "Century Gothic", "Century Schoolbook", "Cervo", "Chalfont", "Chaucer", "Chivo", "Chunk", "Clarendon", "Clarendon Condensed", "Clavo", "Clavo Regular", "Clear Sans Screen", "Code", "Comic Sans", "Comic Sans MS", "Conifer", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Core Sans NR", "Courier", "Courier New", "Curely", "D Sert", "Delicate", "Delicious", "DIN", "Directors Gothic", "Dogtown", "Domine", "Donau", "Dosis", "Droid Sans", "Droid Serif", "Emblema Headline", "Endless Bummer", "English 111 Vivace BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "Exo", "Exo 2", "Fabfelt Script", "Fanwood", "Fedra Sans", "Fela", "Felice", "Felice Regular", "Fertigo Pro", "FFF TUSJ", "Fins", "Fjalla One", "Fontin", "Franchise", "Franklin Gothic", "Franklin Gothic Book", "Franklin Gothic Demi", "Franklin Gothic Demi Cond", "Franklin Gothic Heavy", "Franklin Gothic Medium", "Franklin Gothic Medium Cond", "Free Spirit", "FS Clerkenwell", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Galano Classic", "Garamond", "GEOM", "Georgia", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Giant", "Gibbs", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Glaser Stencil", "Glober", "Gloucester MT Extra Condensed", "Gotham", "GOTHAM", "GOTHAM BOLD", "Goudy Bookletter 1911", "Goudy Old Style", "Gravitas One", "Hamster", "Harman", "Helena", "Helvetica", "Helvetica Neue", "Herald", "Hero", "Hogshead", "Home Brush", "Horizontes Script", "Hoverage", "Humanst 521 Cn BT", "HWT Artz", "Ikaros", "Impact", "Inconsolata", "Into The Light", "Istok Web", "Itoya", "Ivory", "Jack", "Jekyll and Hyde", "Jimmy", "Josefin Slab", "Junction", "Kapra", "Karla", "Karol", "Karol Regular", "Karol Semi Bold Italic", "Kautiva", "Kelso", "Knewave", "Kurversbrug", "Lato", "League Gothic", "League Script Number One", "League Spartan", "Libre Baskerville", "Linden Hill", "Linotte", "Lobster", "Lombok", "Lora", "Louize", "Louize Italic", "Louize Medium", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lulo Clean", "Manifesto", "Maxwell", "Merel", "Merlo", "Merriweather", "Metro Nova", "Metro Nova Light", "Metro Nova Regular", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "Modern Brush", "Modern No. 20", "MONO", "Monthoers", "Montserrat", "Moon", "Mrs Eaves", "MS Gothic", "MS LineDraw", "MS Mincho", "MS Outlook", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS Reference Specialty", "MS Sans Serif", "MS Serif", "MS UI Gothic", "MTT Milano", "Muli", "Museo Slab", "Myriad Pro", "Neo Sans", "Neo-Noire", "Neutron", "News Gothic", "News GothicMT", "NewsGoth BT", "Nickainley Script", "Nobile", "Old Century", "Old English Text MT", "Old Standard TT", "Open Sans", "Orbitron", "Ostrich Sans", "Oswald", "Palatino", "Palatino Linotype", "Papyrus", "Parchment", "Pegasus", "Perfograma", "Perpetua", "Perpetua Titling MT", "Petala Pro", "Petala Semi Light", "Pipeburn", "Playfair Display", "Prociono", "PT Sans", "PT Serif", "Pythagoras", "Qandon", "Qandon Regular", "Questrial", "Raleway", "Razor", "Reef", "Roboto", "Roboto Slab", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Runaway", "Sartorius", "Schist", "Scripta Pro", "Seaside Resort", "Selfie", "Serendipity", "Serifa", "Serifa BT", "Serifa Th BT", "Shine Pro", "Shoebox", "Signika", "Silver", "Skolar", "Skyward", "Sniglet", "Sortdecai", "Sorts Mill Goudy", "Source Sans Pro", "Sparkle", "Splandor", "Springtime", "Spruce", "Spumante", "Squoosh Gothic", "Stadt", "Stencil", "Streamster", "Sunday", "Sunn", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Symbol", "Tahoma", "Technical", "Texta", "Ticketbook", "Timber", "Times", "Times New Roman", "Times New Roman PS", "Titillium Web", "Trajan", "TRAJAN PRO", "Trebuchet MS", "Trend Rough", "Troika", "Twist", "Ubuntu", "Uniform", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Unveil", "Uomo", "Varela Round", "Verdana", "Visby", "Vollkorn", "Wahhabi Script", "Waterlily", "Wayback", "Webdings", "Wendy", "Wingdings", "Wingdings 2", "Wingdings 3", "Woodland", "Yonder", "Zodiaclaw"];
            var d = [];
            while (k.length > 0) {
                var c = k.pop();
                var i = false;
                for (j = 0; j < p.length && !i; j++) {
                    if (e() > f) {
                        return padString("", 10);
                    }
                    o.style.fontFamily = c + "," + p[j];
                    g.appendChild(o);
                    var b = (o.offsetWidth !== q[p[j]] || o.offsetHeight !== a[p[j]]);
                    g.removeChild(o);
                    i = i || b;
                }
                if (i) {
                    d.push(c);
                }
            }
            return d.join(";");
        } catch (m) {
            return padString("", 10);
        }
    }

    function dfGetProp() {
        var a = {};
        var p = {};
        p.plugins = 10;
        p.nrOfPlugins = 3;
        p.fonts = 10;
        p.nrOfFonts = 3;
        p.timeZone = 10;
        p.video = 10;
        p.superCookies = 10;
        p.userAgent = 10;
        p.mimeTypes = 10;
        p.nrOfMimeTypes = 3;
        p.canvas = 10;
        p.cpuClass = 5;
        p.platform = 5;
        p.doNotTrack = 5;
        p.webglFp = 10;
        p.jsFonts = 10;
        try {
            try {
                var d = dfGetPlug();
                a.plugins = padString(calculateMd5_b64(d.obj), p.plugins);
                a.nrOfPlugins = padString(String(d.nr), p.nrOfPlugins);
            } catch (m) {
                a.plugins = padString("", p.plugins);
                a.nrOfPlugins = padString("", p.nrOfPlugins);
            }
            a.fonts = padString("", p.fonts);
            a.nrOfFonts = padString("", p.nrOfFonts);
            try {
                var r = new Date();
                r.setDate(1);
                r.setMonth(5);
                var c = r.getTimezoneOffset();
                r.setMonth(11);
                var b = r.getTimezoneOffset();
                a.timeZone = padString(calculateMd5_b64(c + "**" + b), p.timeZone);
            } catch (m) {
                a.timeZone = padString("", p.timeZone);
            }
            try {
                a.video = padString(String((screen.width + 7) * (screen.height + 7) * screen.colorDepth), p.video);
            } catch (m) {
                a.video = padString("", p.video);
            }
            a.superCookies = padString(calculateMd5_b64(dfGetDS()), Math.floor(p.superCookies / 2)) + padString(calculateMd5_b64(dfGetIEUD()), Math.floor(p.superCookies / 2));
            a.userAgent = padString(calculateMd5_b64(navigator.userAgent), p.userAgent);
            var k = "";
            var h = 0;
            if (navigator.mimeTypes) {
                h = navigator.mimeTypes.length;
                for (var g = 0; g < h; g++) {
                    var o = navigator.mimeTypes[g];
                    k += o.description + o.type + o.suffixes;
                }
            }
            a.mimeTypes = padString(calculateMd5_b64(k), p.mimeTypes);
            a.nrOfMimeTypes = padString(String(h), p.nrOfMimeTypes);
            a.canvas = padString(calculateMd5_b64(dfCanvasFingerprint()), p.canvas);
            a.cpuClass = (navigator.cpuClass) ? padString(calculateMd5_b64(navigator.cpuClass), p.cpuClass) : padString("", p.cpuClass);
            a.platform = (navigator.platform) ? padString(calculateMd5_b64(navigator.platform), p.platform) : padString("", p.platform);
            a.doNotTrack = (navigator.doNotTrack) ? padString(calculateMd5_b64(navigator.doNotTrack), p.doNotTrack) : padString("", p.doNotTrack);
            a.jsFonts = padString(calculateMd5_b64(getJsFonts()), p.jsFonts);
            a.webglFp = padString(calculateMd5_b64(getWebglFp()), p.webglFp);
            var f = 0,
                q;
            for (q in a) {
                if (a.hasOwnProperty(q)) {
                    f = 0;
                    try {
                        f = a[q].length;
                    } catch (m) {}
                    if (typeof a[q] === "undefined" || a[q] === null || f !== p[q]) {
                        a[q] = padString("", p[q]);
                    }
                }
            }
        } catch (j) {}
        return a;
    }

    function dfCanvasFingerprint() {
        var d = document.createElement("canvas");
        if (!!(d.getContext && d.getContext("2d"))) {
            var c = document.createElement("canvas");
            var b = c.getContext("2d");
            var a = "#&*(sdfjlSDFkjls28270(";
            b.font = "14px 'Arial'";
            b.textBaseline = "alphabetic";
            b.fillStyle = "#f61";
            b.fillRect(138, 2, 63, 20);
            b.fillStyle = "#068";
            b.fillText(a, 3, 16);
            b.fillStyle = "rgba(105, 194, 1, 0.6)";
            b.fillText(a, 5, 18);
            return c.toDataURL();
        }
        return padString("", 10);
    }

    function populateFontList(a) {}

    function dfGetEntropy() {
        var a = ["iPad", "iPhone", "iPod"];
        var c = navigator.userAgent;
        if (c) {
            for (var b = 0; b < a.length; b++) {
                if (c.indexOf(a[b]) >= 0) {
                    return "20";
                }
            }
        }
        return "40";
    }

    function dfSet(f, b) {
        try {
            var a = dfGetProp();
            var c = dfHashConcat(a);
            var h = dfGetEntropy();
            var g = _.G(f);
            g.value = c + ":" + h;
        } catch (d) {}
    }

    function dfHashConcat(a) {
        try {
            var c = "";
            c = a.plugins + a.nrOfPlugins + a.fonts + a.nrOfFonts + a.timeZone + a.video + a.superCookies + a.userAgent + a.mimeTypes + a.nrOfMimeTypes + a.canvas + a.cpuClass + a.platform + a.doNotTrack + a.webglFp + a.jsFonts;
            c = c.replace(/\+/g, "G").replace(/\//g, "D");
            return c;
        } catch (b) {
            return "";
        }
    }

    function dfDo(b) {
        try {
            var c = _.G(b);
            if (!c) {
                return;
            }
            if (c.value) {
                return;
            }
            dfInitDS();
            _.R(function() {
                setTimeout(function() {
                    dfSet(b, 0);
                }, 500);
            });
        } catch (a) {}
    }

    function padString(c, a) {
        if (c.length >= a) {
            return (c.substring(0, a));
        } else {
            for (var b = ""; b.length < a - c.length; b += "0") {}
            return (b.concat(c));
        }
    }

    function calculateMd5_b64(a) {
        return md5_binl2b64(md5_cmc5(md5_s2b(a), a.length * 8));
    }

    function md5_cmc5(w, r) {
        w[r >> 5] |= 128 << ((r) % 32);
        w[(((r + 64) >>> 9) << 4) + 14] = r;
        var v = 1732584193;
        var u = -271733879;
        var t = -1732584194;
        var s = 271733878;
        for (var m = 0; m < w.length; m += 16) {
            var q = v;
            var p = u;
            var o = t;
            var k = s;
            v = md5_ff(v, u, t, s, w[m + 0], 7, -680876936);
            s = md5_ff(s, v, u, t, w[m + 1], 12, -389564586);
            t = md5_ff(t, s, v, u, w[m + 2], 17, 606105819);
            u = md5_ff(u, t, s, v, w[m + 3], 22, -1044525330);
            v = md5_ff(v, u, t, s, w[m + 4], 7, -176418897);
            s = md5_ff(s, v, u, t, w[m + 5], 12, 1200080426);
            t = md5_ff(t, s, v, u, w[m + 6], 17, -1473231341);
            u = md5_ff(u, t, s, v, w[m + 7], 22, -45705983);
            v = md5_ff(v, u, t, s, w[m + 8], 7, 1770035416);
            s = md5_ff(s, v, u, t, w[m + 9], 12, -1958414417);
            t = md5_ff(t, s, v, u, w[m + 10], 17, -42063);
            u = md5_ff(u, t, s, v, w[m + 11], 22, -1990404162);
            v = md5_ff(v, u, t, s, w[m + 12], 7, 1804603682);
            s = md5_ff(s, v, u, t, w[m + 13], 12, -40341101);
            t = md5_ff(t, s, v, u, w[m + 14], 17, -1502002290);
            u = md5_ff(u, t, s, v, w[m + 15], 22, 1236535329);
            v = md5_gg(v, u, t, s, w[m + 1], 5, -165796510);
            s = md5_gg(s, v, u, t, w[m + 6], 9, -1069501632);
            t = md5_gg(t, s, v, u, w[m + 11], 14, 643717713);
            u = md5_gg(u, t, s, v, w[m + 0], 20, -373897302);
            v = md5_gg(v, u, t, s, w[m + 5], 5, -701558691);
            s = md5_gg(s, v, u, t, w[m + 10], 9, 38016083);
            t = md5_gg(t, s, v, u, w[m + 15], 14, -660478335);
            u = md5_gg(u, t, s, v, w[m + 4], 20, -405537848);
            v = md5_gg(v, u, t, s, w[m + 9], 5, 568446438);
            s = md5_gg(s, v, u, t, w[m + 14], 9, -1019803690);
            t = md5_gg(t, s, v, u, w[m + 3], 14, -187363961);
            u = md5_gg(u, t, s, v, w[m + 8], 20, 1163531501);
            v = md5_gg(v, u, t, s, w[m + 13], 5, -1444681467);
            s = md5_gg(s, v, u, t, w[m + 2], 9, -51403784);
            t = md5_gg(t, s, v, u, w[m + 7], 14, 1735328473);
            u = md5_gg(u, t, s, v, w[m + 12], 20, -1926607734);
            v = md5_hh(v, u, t, s, w[m + 5], 4, -378558);
            s = md5_hh(s, v, u, t, w[m + 8], 11, -2022574463);
            t = md5_hh(t, s, v, u, w[m + 11], 16, 1839030562);
            u = md5_hh(u, t, s, v, w[m + 14], 23, -35309556);
            v = md5_hh(v, u, t, s, w[m + 1], 4, -1530992060);
            s = md5_hh(s, v, u, t, w[m + 4], 11, 1272893353);
            t = md5_hh(t, s, v, u, w[m + 7], 16, -155497632);
            u = md5_hh(u, t, s, v, w[m + 10], 23, -1094730640);
            v = md5_hh(v, u, t, s, w[m + 13], 4, 681279174);
            s = md5_hh(s, v, u, t, w[m + 0], 11, -358537222);
            t = md5_hh(t, s, v, u, w[m + 3], 16, -722521979);
            u = md5_hh(u, t, s, v, w[m + 6], 23, 76029189);
            v = md5_hh(v, u, t, s, w[m + 9], 4, -640364487);
            s = md5_hh(s, v, u, t, w[m + 12], 11, -421815835);
            t = md5_hh(t, s, v, u, w[m + 15], 16, 530742520);
            u = md5_hh(u, t, s, v, w[m + 2], 23, -995338651);
            v = md5_ii(v, u, t, s, w[m + 0], 6, -198630844);
            s = md5_ii(s, v, u, t, w[m + 7], 10, 1126891415);
            t = md5_ii(t, s, v, u, w[m + 14], 15, -1416354905);
            u = md5_ii(u, t, s, v, w[m + 5], 21, -57434055);
            v = md5_ii(v, u, t, s, w[m + 12], 6, 1700485571);
            s = md5_ii(s, v, u, t, w[m + 3], 10, -1894986606);
            t = md5_ii(t, s, v, u, w[m + 10], 15, -1051523);
            u = md5_ii(u, t, s, v, w[m + 1], 21, -2054922799);
            v = md5_ii(v, u, t, s, w[m + 8], 6, 1873313359);
            s = md5_ii(s, v, u, t, w[m + 15], 10, -30611744);
            t = md5_ii(t, s, v, u, w[m + 6], 15, -1560198380);
            u = md5_ii(u, t, s, v, w[m + 13], 21, 1309151649);
            v = md5_ii(v, u, t, s, w[m + 4], 6, -145523070);
            s = md5_ii(s, v, u, t, w[m + 11], 10, -1120210379);
            t = md5_ii(t, s, v, u, w[m + 2], 15, 718787259);
            u = md5_ii(u, t, s, v, w[m + 9], 21, -343485551);
            v = md5_safe_add(v, q);
            u = md5_safe_add(u, p);
            t = md5_safe_add(t, o);
            s = md5_safe_add(s, k);
        }
        return Array(v, u, t, s);
    }

    function md5_cmn(h, e, d, c, g, f) {
        return md5_safe_add(md5_bit_rol(md5_safe_add(md5_safe_add(e, h), md5_safe_add(c, f)), g), d);
    }

    function md5_ff(g, f, k, j, e, i, h) {
        return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h);
    }

    function md5_gg(g, f, k, j, e, i, h) {
        return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h);
    }

    function md5_hh(g, f, k, j, e, i, h) {
        return md5_cmn(f ^ k ^ j, g, f, e, i, h);
    }

    function md5_ii(g, f, k, j, e, i, h) {
        return md5_cmn(k ^ (f | (~j)), g, f, e, i, h);
    }

    function md5_safe_add(d, f) {
        var e = (d & 65535) + (f & 65535);
        var c = (d >> 16) + (f >> 16) + (e >> 16);
        return (c << 16) | (e & 65535);
    }

    function md5_bit_rol(d, c) {
        return (d << c) | (d >>> (32 - c));
    }

    function md5_s2b(e) {
        var d = Array();
        var g = (1 << 8) - 1;
        for (var f = 0; f < e.length * 8; f += 8) {
            d[f >> 5] |= (e.charCodeAt(f / 8) & g) << (f % 32);
        }
        return d;
    }

    function md5_binl2b64(f) {
        var h = "";
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var o = "";
        for (var k = 0; k < f.length * 4; k += 3) {
            var m = (((f[k >> 2] >> 8 * (k % 4)) & 255) << 16) | (((f[k + 1 >> 2] >> 8 * ((k + 1) % 4)) & 255) << 8) | ((f[k + 2 >> 2] >> 8 * ((k + 2) % 4)) & 255);
            for (var g = 0; g < 4; g++) {
                if (k * 8 + g * 6 > f.length * 32) {
                    o += h;
                } else {
                    o += e.charAt((m >> 6 * (3 - g)) & 63);
                }
            }
        }
        return o;
    }
    var PluginDetect = {
        version: "0.7.5",
        name: "PluginDetect",
        handler: function(f, d, e) {
            return function() {
                f(d, e);
            };
        },
        isDefined: function(a) {
            return typeof a != "undefined";
        },
        isArray: function(a) {
            return (/array/i).test(Object.prototype.toString.call(a));
        },
        isFunc: function(a) {
            return typeof a == "function";
        },
        isString: function(a) {
            return typeof a == "string";
        },
        isNum: function(a) {
            return typeof a == "number";
        },
        isStrNum: function(a) {
            return (typeof a == "string" && (/\d/).test(a));
        },
        getNumRegx: /[\d][\d\.\_,-]*/,
        splitNumRegx: /[\.\_,-]/g,
        getNum: function(e, h) {
            var g = this,
                f = g.isStrNum(e) ? (g.isDefined(h) ? new RegExp(h) : g.getNumRegx).exec(e) : null;
            return f ? f[0] : null;
        },
        compareNums: function(k, o, q) {
            var p = this,
                r, i, j, m = parseInt;
            if (p.isStrNum(k) && p.isStrNum(o)) {
                if (p.isDefined(q) && q.compareNums) {
                    return q.compareNums(k, o);
                }
                r = k.split(p.splitNumRegx);
                i = o.split(p.splitNumRegx);
                for (j = 0; j < Math.min(r.length, i.length); j++) {
                    if (m(r[j], 10) > m(i[j], 10)) {
                        return 1;
                    }
                    if (m(r[j], 10) < m(i[j], 10)) {
                        return -1;
                    }
                }
            }
            return 0;
        },
        formatNum: function(f, j) {
            var i = this,
                g, h;
            if (!i.isStrNum(f)) {
                return null;
            }
            if (!i.isNum(j)) {
                j = 4;
            }
            j--;
            h = f.replace(/\s/g, "").split(i.splitNumRegx).concat(["0", "0", "0", "0"]);
            for (g = 0; g < 4; g++) {
                if (/^(0+)(.+)$/.test(h[g])) {
                    h[g] = RegExp.$2;
                }
                if (g > j || !(/\d/).test(h[g])) {
                    h[g] = "0";
                }
            }
            return h.slice(0, 4).join(",");
        },
        $$hasMimeType: function(b) {
            return function(i) {
                if (!b.isIE && i) {
                    var j, a, h, g = b.isString(i) ? [i] : i;
                    if (!g || !g.length) {
                        return null;
                    }
                    for (h = 0; h < g.length; h++) {
                        if (/[^\s]/.test(g[h]) && (j = navigator.mimeTypes[g[h]]) && (a = j.enabledPlugin) && (a.name || a.description)) {
                            return j;
                        }
                    }
                }
                return null;
            };
        },
        findNavPlugin: function(o, u, w) {
            var q = this,
                r = new RegExp(o, "i"),
                v = (!q.isDefined(u) || u) ? /\d/ : 0,
                p = w ? new RegExp(w, "i") : 0,
                z = navigator.plugins,
                s = "",
                t, y, i;
            for (t = 0; t < z.length; t++) {
                i = z[t].description || s;
                y = z[t].name || s;
                if ((r.test(i) && (!v || v.test(RegExp.leftContext + RegExp.rightContext))) || (r.test(y) && (!v || v.test(RegExp.leftContext + RegExp.rightContext)))) {
                    if (!p || !(p.test(i) || p.test(y))) {
                        return z[t];
                    }
                }
            }
            return null;
        },
        getMimeEnabledPlugin: function(h, i) {
            var j = this,
                g, m = new RegExp(i, "i"),
                k = "";
            if ((g = j.hasMimeType(h)) && (g = g.enabledPlugin) && (m.test(g.description || k) || m.test(g.name || k))) {
                return g;
            }
            return 0;
        },
        getPluginFileVersion: function(o, i) {
            var k = this,
                p, q, m, j, r = -1;
            if (k.OS > 2 || !o || !o.version || !(p = k.getNum(o.version))) {
                return i;
            }
            if (!i) {
                return p;
            }
            p = k.formatNum(p);
            i = k.formatNum(i);
            q = i.split(k.splitNumRegx);
            m = p.split(k.splitNumRegx);
            for (j = 0; j < q.length; j++) {
                if (r > -1 && j > r && q[j] != "0") {
                    return i;
                }
                if (m[j] != q[j]) {
                    if (r == -1) {
                        r = j;
                    }
                    if (q[j] != "0") {
                        return i;
                    }
                }
            }
            return p;
        },
        AXO: window.ActiveXObject,
        getAXO: function(e) {
            var h = null,
                i, j = this,
                g;
            try {
                h = new j.AXO(e);
            } catch (i) {}
            return h;
        },
        convertFuncs: function(k) {
            var i, j, m, e = /^[\$][\$]/,
                o = {},
                p = this;
            for (i in k) {
                if (e.test(i)) {
                    o[i] = 1;
                }
            }
            for (i in o) {
                try {
                    j = i.slice(2);
                    if (j.length > 0 && !k[j]) {
                        k[j] = k[i](k);
                        delete k[i];
                    }
                } catch (m) {}
            }
        },
        initScript: function() {
            var t = this,
                v = navigator,
                r = "/",
                m = v.userAgent || "",
                p = v.vendor || "",
                u = v.platform || "",
                o = v.product || "";
            t.OS = 100;
            if (u) {
                var q, s = ["Win", 1, "Mac", 2, "Linux", 3, "FreeBSD", 4, "iPhone", 21.1, "iPod", 21.2, "iPad", 21.3, "Win.*CE", 22.1, "Win.*Mobile", 22.2, "Pocket\\s*PC", 22.3, "", 100];
                for (q = s.length - 2; q >= 0; q = q - 2) {
                    if (s[q] && new RegExp(s[q], "i").test(u)) {
                        t.OS = s[q + 1];
                        break;
                    }
                }
            }
            t.convertFuncs(t);
            t.isIE = (function() {
                var a = (function(z, g) {
                    var N = "0.7.10",
                        P = "",
                        O = "?",
                        G = "function",
                        i = "undefined",
                        e = "object",
                        E = "string",
                        f = "major",
                        I = "model",
                        h = "name",
                        C = "type",
                        y = "vendor",
                        K = "version",
                        c = "architecture",
                        j = "console",
                        F = "mobile",
                        L = "tablet",
                        B = "smarttv",
                        M = "wearable",
                        H = "embedded";
                    var d = {
                        extend: function(Q, S) {
                            for (var R in S) {
                                if ("browser cpu device engine os".indexOf(R) !== -1 && S[R].length % 2 === 0) {
                                    Q[R] = S[R].concat(Q[R]);
                                }
                            }
                            return Q;
                        },
                        has: function(R, Q) {
                            if (typeof R === "string") {
                                return Q.toLowerCase().indexOf(R.toLowerCase()) !== -1;
                            } else {
                                return false;
                            }
                        },
                        lowerize: function(Q) {
                            return Q.toLowerCase();
                        },
                        major: function(Q) {
                            return typeof(Q) === E ? Q.split(".")[0] : g;
                        }
                    };
                    var J = {
                        rgx: function() {
                            var aa, U = 0,
                                T, S, R, Q, V, W, X = arguments;
                            while (U < X.length && !V) {
                                var Z = X[U],
                                    Y = X[U + 1];
                                if (typeof aa === i) {
                                    aa = {};
                                    for (R in Y) {
                                        if (Y.hasOwnProperty(R)) {
                                            Q = Y[R];
                                            if (typeof Q === e) {
                                                aa[Q[0]] = g;
                                            } else {
                                                aa[Q] = g;
                                            }
                                        }
                                    }
                                }
                                T = S = 0;
                                while (T < Z.length && !V) {
                                    V = Z[T++].exec(this.getUA());
                                    if (!!V) {
                                        for (R = 0; R < Y.length; R++) {
                                            W = V[++S];
                                            Q = Y[R];
                                            if (typeof Q === e && Q.length > 0) {
                                                if (Q.length == 2) {
                                                    if (typeof Q[1] == G) {
                                                        aa[Q[0]] = Q[1].call(this, W);
                                                    } else {
                                                        aa[Q[0]] = Q[1];
                                                    }
                                                } else {
                                                    if (Q.length == 3) {
                                                        if (typeof Q[1] === G && !(Q[1].exec && Q[1].test)) {
                                                            aa[Q[0]] = W ? Q[1].call(this, W, Q[2]) : g;
                                                        } else {
                                                            aa[Q[0]] = W ? W.replace(Q[1], Q[2]) : g;
                                                        }
                                                    } else {
                                                        if (Q.length == 4) {
                                                            aa[Q[0]] = W ? Q[3].call(this, W.replace(Q[1], Q[2])) : g;
                                                        }
                                                    }
                                                }
                                            } else {
                                                aa[Q] = W ? W : g;
                                            }
                                        }
                                    }
                                }
                                U += 2;
                            }
                            return aa;
                        },
                        str: function(T, S) {
                            for (var R in S) {
                                if (typeof S[R] === e && S[R].length > 0) {
                                    for (var Q = 0; Q < S[R].length; Q++) {
                                        if (d.has(S[R][Q], T)) {
                                            return (R === O) ? g : R;
                                        }
                                    }
                                } else {
                                    if (d.has(S[R], T)) {
                                        return (R === O) ? g : R;
                                    }
                                }
                            }
                            return T;
                        }
                    };
                    var D = {
                        browser: {
                            oldsafari: {
                                version: {
                                    "1.0": "/8",
                                    "1.2": "/1",
                                    "1.3": "/3",
                                    "2.0": "/412",
                                    "2.0.2": "/416",
                                    "2.0.3": "/417",
                                    "2.0.4": "/419",
                                    "?": "/"
                                }
                            }
                        },
                        device: {
                            amazon: {
                                model: {
                                    "Fire Phone": ["SD", "KF"]
                                }
                            },
                            sprint: {
                                model: {
                                    "Evo Shift 4G": "7373KT"
                                },
                                vendor: {
                                    HTC: "APA",
                                    Sprint: "Sprint"
                                }
                            }
                        },
                        os: {
                            windows: {
                                version: {
                                    ME: "4.90",
                                    "NT 3.11": "NT3.51",
                                    "NT 4.0": "NT4.0",
                                    "2000": "NT 5.0",
                                    XP: ["NT 5.1", "NT 5.2"],
                                    Vista: "NT 6.0",
                                    "7": "NT 6.1",
                                    "8": "NT 6.2",
                                    "8.1": "NT 6.3",
                                    "10": ["NT 6.4", "NT 10.0"],
                                    RT: "ARM"
                                }
                            }
                        }
                    };
                    var A = {
                        browser: [
                            [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                            [h, K],
                            [/(OPiOS)[\/\s]+([\w\.]+)/i],
                            [
                                [h, "Opera Mini"], K
                            ],
                            [/\s(opr)\/([\w\.]+)/i],
                            [
                                [h, "Opera"], K
                            ],
                            [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i],
                            [h, K],
                            [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                            [
                                [h, "IE"], K
                            ],
                            [/(edge)\/((\d+)?[\w\.]+)/i],
                            [h, K],
                            [/(yabrowser)\/([\w\.]+)/i],
                            [
                                [h, "Yandex"], K
                            ],
                            [/(comodo_dragon)\/([\w\.]+)/i],
                            [
                                [h, /_/g, " "], K
                            ],
                            [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(qqbrowser)[\/\s]?([\w\.]+)/i],
                            [h, K],
                            [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /JUC.+(ucweb)[\/\s]?([\w\.]+)/i],
                            [
                                [h, "UCBrowser"], K
                            ],
                            [/(dolfin)\/([\w\.]+)/i],
                            [
                                [h, "Dolphin"], K
                            ],
                            [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                            [
                                [h, "Chrome"], K
                            ],
                            [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
                            [K, [h, "MIUI Browser"]],
                            [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
                            [K, [h, "Android Browser"]],
                            [/FBAV\/([\w\.]+);/i],
                            [K, [h, "Facebook"]],
                            [/fxios\/([\w\.-]+)/i],
                            [K, [h, "Firefox"]],
                            [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                            [K, [h, "Mobile Safari"]],
                            [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                            [K, h],
                            [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                            [h, [K, J.str, D.browser.oldsafari.version]],
                            [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                            [h, K],
                            [/(navigator|netscape)\/([\w\.-]+)/i],
                            [
                                [h, "Netscape"], K
                            ],
                            [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                            [h, K]
                        ]
                    };
                    var w = function(R, T) {
                        if (!(this instanceof w)) {
                            return new w(R, T).getResult();
                        }
                        var S = R || ((z && z.navigator && z.navigator.userAgent) ? z.navigator.userAgent : P);
                        var Q = T ? d.extend(A, T) : A;
                        this.getBrowser = function() {
                            var U = J.rgx.apply(this, Q.browser);
                            U.major = d.major(U.version);
                            return U;
                        };
                        this.getUA = function() {
                            return S;
                        };
                        this.setUA = function(U) {
                            S = U;
                            return this;
                        };
                        this.setUA(S);
                        return this;
                    };
                    w.VERSION = N;
                    w.BROWSER = {
                        NAME: h,
                        MAJOR: f,
                        VERSION: K
                    };
                    w.CPU = {
                        ARCHITECTURE: c
                    };
                    w.DEVICE = {
                        MODEL: I,
                        VENDOR: y,
                        TYPE: C,
                        CONSOLE: j,
                        MOBILE: F,
                        SMARTTV: B,
                        TABLET: L,
                        WEARABLE: M,
                        EMBEDDED: H
                    };
                    w.ENGINE = {
                        NAME: h,
                        VERSION: K
                    };
                    w.OS = {
                        NAME: h,
                        VERSION: K
                    };
                    return w;
                })(typeof window === "object" ? window : this);
                var b = new a();
                return /^IE|Edge$/.test((b.getBrowser() || {}).name);
            }());
            t.verIE = t.isIE && (/MSIE\s*(\d+\.?\d*)/i).test(m) ? parseFloat(RegExp.$1, 10) : null;
            t.ActiveXEnabled = false;
            if (t.isIE) {
                var q, k = ["Msxml2.XMLHTTP", "Msxml2.DOMDocument", "Microsoft.XMLDOM", "ShockwaveFlash.ShockwaveFlash", "TDCCtl.TDCCtl", "Shell.UIHelper", "Scripting.Dictionary", "wmplayer.ocx"];
                for (q = 0; q < k.length; q++) {
                    if (t.getAXO(k[q])) {
                        t.ActiveXEnabled = true;
                        break;
                    }
                }
                t.head = t.isDefined(document.getElementsByTagName) ? document.getElementsByTagName("head")[0] : null;
            }
            t.isGecko = (/Gecko/i).test(o) && (/Gecko\s*\/\s*\d/i).test(m);
            t.verGecko = t.isGecko ? t.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(m) ? RegExp.$1 : "0.9") : null;
            t.isSafari = (/Safari\s*\/\s*\d/i).test(m) && (/Apple/i).test(p);
            t.isChrome = (/Chrome\s*\/\s*(\d[\d\.]*)/i).test(m);
            t.verChrome = t.isChrome ? t.formatNum(RegExp.$1) : null;
            t.isOpera = (/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(m);
            t.verOpera = t.isOpera && ((/Version\s*\/\s*(\d+\.?\d*)/i).test(m) || 1) ? parseFloat(RegExp.$1, 10) : null;
            t.addWinEvent("load", t.handler(t.runWLfuncs, t));
        },
        init: function(f) {
            var d = this,
                e, f;
            if (!d.isString(f)) {
                return -3;
            }
            if (f.length == 1) {
                d.getVersionDelimiter = f;
                return -3;
            }
            f = f.toLowerCase().replace(/\s/g, "");
            e = d[f];
            if (!e || !e.getVersion) {
                return -3;
            }
            d.plugin = e;
            if (!d.isDefined(e.installed)) {
                e.installed = e.version = e.version0 = e.getVersionDone = null;
                e.$ = d;
                e.pluginName = f;
            }
            d.garbage = false;
            if (d.isIE && !d.ActiveXEnabled) {
                if (e !== d.java) {
                    return -2;
                }
            }
            return 1;
        },
        fPush: function(d, e) {
            var f = this;
            if (f.isArray(e) && (f.isFunc(d) || (f.isArray(d) && d.length > 0 && f.isFunc(d[0])))) {
                e.push(d);
            }
        },
        callArray: function(d) {
            var f = this,
                e;
            if (f.isArray(d)) {
                for (e = 0; e < d.length; e++) {
                    if (d[e] === null) {
                        return;
                    }
                    f.call(d[e]);
                    d[e] = null;
                }
            }
        },
        call: function(f) {
            var d = this,
                e = d.isArray(f) ? f.length : -1;
            if (e > 0 && d.isFunc(f[0])) {
                f[0](d, e > 1 ? f[1] : 0, e > 2 ? f[2] : 0, e > 3 ? f[3] : 0);
            } else {
                if (d.isFunc(f)) {
                    f(d);
                }
            }
        },
        getVersionDelimiter: ",",
        $$getVersion: function(b) {
            return function(j, o, p) {
                var m = b.init(j),
                    k, a, i;
                if (m < 0) {
                    return null;
                }
                k = b.plugin;
                if (k.getVersionDone != 1) {
                    k.getVersion(null, o, p);
                    if (k.getVersionDone === null) {
                        k.getVersionDone = 1;
                    }
                }
                b.cleanup();
                a = (k.version || k.version0);
                a = a ? a.replace(b.splitNumRegx, b.getVersionDelimiter) : a;
                return a;
            };
        },
        cleanup: function() {
            var b = this;
            if (b.garbage && b.isDefined(window.CollectGarbage)) {
                window.CollectGarbage();
            }
        },
        isActiveXObject: function(m, e) {
            var k = this,
                i = false,
                j, p = "<",
                o = p + 'object width="1" height="1" style="display:none" ' + m.getCodeBaseVersion(e) + ">" + m.HTML + p + "/object>";
            if (!k.head) {
                return i;
            }
            if (k.head.firstChild) {
                k.head.insertBefore(document.createElement("object"), k.head.firstChild);
            } else {
                k.head.appendChild(document.createElement("object"));
            }
            k.head.firstChild.outerHTML = o;
            try {
                k.head.firstChild.classid = m.classID;
            } catch (j) {}
            try {
                if (k.head.firstChild.object) {
                    i = true;
                }
            } catch (j) {}
            try {
                if (i && k.head.firstChild.readyState < 4) {
                    k.garbage = true;
                }
            } catch (j) {}
            k.head.removeChild(k.head.firstChild);
            return i;
        },
        codebaseSearch: function(z, D) {
            var C = this;
            if (!C.ActiveXEnabled || !z) {
                return null;
            }
            if (z.BIfuncs && z.BIfuncs.length && z.BIfuncs[z.BIfuncs.length - 1] !== null) {
                C.callArray(z.BIfuncs);
            }
            var B, p = z.SEARCH,
                q;
            if (C.isStrNum(D)) {
                if (p.match && p.min && C.compareNums(D, p.min) <= 0) {
                    return true;
                }
                if (p.match && p.max && C.compareNums(D, p.max) >= 0) {
                    return false;
                }
                B = C.isActiveXObject(z, D);
                if (B && (!p.min || C.compareNums(D, p.min) > 0)) {
                    p.min = D;
                }
                if (!B && (!p.max || C.compareNums(D, p.max) < 0)) {
                    p.max = D;
                }
                return B;
            }
            var A = [0, 0, 0, 0],
                t = [].concat(p.digits),
                E = p.min ? 1 : 0,
                u, v, w, y, s, r = function(c, a) {
                    var b = [].concat(A);
                    b[c] = a;
                    return C.isActiveXObject(z, b.join(","));
                };
            if (p.max) {
                y = p.max.split(C.splitNumRegx);
                for (u = 0; u < y.length; u++) {
                    y[u] = parseInt(y[u], 10);
                }
                if (y[0] < t[0]) {
                    t[0] = y[0];
                }
            }
            if (p.min) {
                s = p.min.split(C.splitNumRegx);
                for (u = 0; u < s.length; u++) {
                    s[u] = parseInt(s[u], 10);
                }
                if (s[0] > A[0]) {
                    A[0] = s[0];
                }
            }
            if (s && y) {
                for (u = 1; u < s.length; u++) {
                    if (s[u - 1] != y[u - 1]) {
                        break;
                    }
                    if (y[u] < t[u]) {
                        t[u] = y[u];
                    }
                    if (s[u] > A[u]) {
                        A[u] = s[u];
                    }
                }
            }
            if (p.max) {
                for (u = 1; u < t.length; u++) {
                    if (y[u] > 0 && t[u] == 0 && t[u - 1] < p.digits[u - 1]) {
                        t[u - 1] += 1;
                        break;
                    }
                }
            }
            for (u = 0; u < t.length; u++) {
                w = {};
                for (v = 0; v < 20; v++) {
                    if (t[u] - A[u] < 1) {
                        break;
                    }
                    B = Math.round((t[u] + A[u]) / 2);
                    if (w["a" + B]) {
                        break;
                    }
                    w["a" + B] = 1;
                    if (r(u, B)) {
                        A[u] = B;
                        E = 1;
                    } else {
                        t[u] = B;
                    }
                }
                t[u] = A[u];
                if (!E && r(u, A[u])) {
                    E = 1;
                }
                if (!E) {
                    break;
                }
            }
            return E ? A.join(",") : null;
        },
        addWinEvent: function(i, j) {
            var h = this,
                g = window,
                f;
            if (h.isFunc(j)) {
                if (g.addEventListener) {
                    g.addEventListener(i, j, false);
                } else {
                    if (g.attachEvent) {
                        g.attachEvent("on" + i, j);
                    } else {
                        f = g["on" + i];
                        g["on" + i] = h.winHandler(j, f);
                    }
                }
            }
        },
        winHandler: function(a, b) {
            return function() {
                a();
                if (typeof b == "function") {
                    b();
                }
            };
        },
        WLfuncs0: [],
        WLfuncs: [],
        runWLfuncs: function(b) {
            b.winLoaded = true;
            b.callArray(b.WLfuncs0);
            b.callArray(b.WLfuncs);
            if (b.onDoneEmptyDiv) {
                b.onDoneEmptyDiv();
            }
        },
        winLoaded: false,
        $$onWindowLoaded: function(b) {
            return function(a) {
                if (b.winLoaded) {
                    b.call(a);
                } else {
                    b.fPush(a, b.WLfuncs);
                }
            };
        },
        div: null,
        divWidth: 50,
        pluginSize: 1,
        emptyDiv: function() {
            var j = this,
                g, h, f, i = 0;
            if (j.div && j.div.childNodes) {
                for (g = j.div.childNodes.length - 1; g >= 0; g--) {
                    f = j.div.childNodes[g];
                    if (f && f.childNodes) {
                        if (i == 0) {
                            for (h = f.childNodes.length - 1; h >= 0; h--) {
                                f.removeChild(f.childNodes[h]);
                            }
                            j.div.removeChild(f);
                        } else {}
                    }
                }
            }
        },
        DONEfuncs: [],
        onDoneEmptyDiv: function() {
            var f = this,
                e, d;
            if (!f.winLoaded) {
                return;
            }
            if (f.WLfuncs && f.WLfuncs.length && f.WLfuncs[f.WLfuncs.length - 1] !== null) {
                return;
            }
            for (e in f) {
                d = f[e];
                if (d && d.funcs) {
                    if (d.OTF == 3) {
                        return;
                    }
                    if (d.funcs.length && d.funcs[d.funcs.length - 1] !== null) {
                        return;
                    }
                }
            }
            for (e = 0; e < f.DONEfuncs.length; e++) {
                f.callArray(f.DONEfuncs);
            }
            f.emptyDiv();
        },
        getWidth: function(f) {
            if (f) {
                var e = f.scrollWidth || f.offsetWidth,
                    d = this;
                if (d.isNum(e)) {
                    return e;
                }
            }
            return -1;
        },
        getTagStatus: function(e, t, z, y) {
            var w = this,
                u, p = e.span,
                o = w.getWidth(p),
                s = z.span,
                q = w.getWidth(s),
                v = t.span,
                r = w.getWidth(v);
            if (!p || !s || !v || !w.getDOMobj(e)) {
                return -2;
            }
            if (q < r || o < 0 || q < 0 || r < 0 || r <= w.pluginSize || w.pluginSize < 1) {
                return 0;
            }
            if (o >= r) {
                return -1;
            }
            try {
                if (o == w.pluginSize && (!w.isIE || w.getDOMobj(e).readyState == 4)) {
                    if (!e.winLoaded && w.winLoaded) {
                        return 1;
                    }
                    if (e.winLoaded && w.isNum(y)) {
                        if (!w.isNum(e.count)) {
                            e.count = y;
                        }
                        if (y - e.count >= 10) {
                            return 1;
                        }
                    }
                }
            } catch (u) {}
            return 0;
        },
        getDOMobj: function(i, h) {
            var j, k = this,
                m = i ? i.span : 0,
                e = m && m.firstChild ? 1 : 0;
            try {
                if (e && h) {
                    m.firstChild.focus();
                }
            } catch (j) {}
            return e ? m.firstChild : null;
        },
        setStyle: function(e, i) {
            var j = e.style,
                h, k, m = this;
            if (j && i) {
                for (h = 0; h < i.length; h = h + 2) {
                    try {
                        j[i[h]] = i[h + 1];
                    } catch (k) {}
                }
            }
        },
        insertDivInBody: function(k) {
            var o, q = this,
                m = "pd33993399",
                r = null,
                p = document,
                e = "<",
                j = (p.getElementsByTagName("body")[0] || p.body);
            if (!j) {
                try {
                    p.write(e + 'div id="' + m + '">o' + e + "/div>");
                    r = p.getElementById(m);
                } catch (o) {}
            }
            j = (p.getElementsByTagName("body")[0] || p.body);
            if (j) {
                if (j.firstChild && q.isDefined(j.insertBefore)) {
                    j.insertBefore(k, j.firstChild);
                } else {
                    j.appendChild(k);
                }
                if (r) {
                    j.removeChild(r);
                }
            } else {}
        },
        insertHTML: function(y, B, w, C, t) {
            var s, r = document,
                u = this,
                d, e = r.createElement("span"),
                p, v, z = "<";
            var A = ["outlineStyle", "none", "borderStyle", "none", "padding", "0px", "margin", "0px", "visibility", "visible"];
            if (!u.isDefined(C)) {
                C = "";
            }
            if (u.isString(y) && (/[^\s]/).test(y)) {
                d = z + y + ' width="' + u.pluginSize + '" height="' + u.pluginSize + '" ';
                for (p = 0; p < B.length; p = p + 2) {
                    if (/[^\s]/.test(B[p + 1])) {
                        d += B[p] + '="' + B[p + 1] + '" ';
                    }
                }
                d += ">";
                for (p = 0; p < w.length; p = p + 2) {
                    if (/[^\s]/.test(w[p + 1])) {
                        d += z + 'param name="' + w[p] + '" value="' + w[p + 1] + '" />';
                    }
                }
                d += C + z + "/" + y + ">";
            } else {
                d = C;
            }
            if (!u.div) {
                u.div = r.createElement("div");
                v = r.getElementById("plugindetect");
                if (v) {
                    u.div = v;
                } else {
                    u.div.id = "plugindetect";
                    u.insertDivInBody(u.div);
                }
                u.setStyle(u.div, A.concat(["width", u.divWidth + "px", "height", (u.pluginSize + 3) + "px", "fontSize", (u.pluginSize + 3) + "px", "lineHeight", (u.pluginSize + 3) + "px", "verticalAlign", "baseline", "display", "block"]));
                if (!v) {
                    u.setStyle(u.div, ["position", "absolute", "right", "0px", "top", "0px"]);
                }
            }
            if (u.div && u.div.parentNode) {
                u.div.appendChild(e);
                u.setStyle(e, A.concat(["fontSize", (u.pluginSize + 3) + "px", "lineHeight", (u.pluginSize + 3) + "px", "verticalAlign", "baseline", "display", "inline"]));
                try {
                    if (e && e.parentNode) {
                        e.focus();
                    }
                } catch (s) {}
                try {
                    e.innerHTML = d;
                } catch (s) {}
                if (e.childNodes.length == 1 && !(u.isGecko && u.compareNums(u.verGecko, "1,5,0,0") < 0)) {
                    u.setStyle(e.firstChild, A.concat(["display", "inline"]));
                }
                return {
                    span: e,
                    winLoaded: u.winLoaded,
                    tagName: (u.isString(y) ? y : "")
                };
            }
            return {
                span: null,
                winLoaded: u.winLoaded,
                tagName: ""
            };
        },
        quicktime: {
            mimeType: ["video/quicktime", "application/x-quicktimeplayer", "image/x-macpaint", "image/x-quicktime"],
            progID: "QuickTimeCheckObject.QuickTimeCheck.1",
            progID0: "QuickTime.QuickTime",
            classID: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
            minIEver: 7,
            HTML: ("<") + 'param name="src" value="" />' + ("<") + 'param name="controller" value="false" />',
            getCodeBaseVersion: function(b) {
                return 'codebase="#version=' + b + '"';
            },
            SEARCH: {
                min: 0,
                max: 0,
                match: 0,
                digits: [16, 128, 128, 0]
            },
            getVersion: function(m) {
                var i = this,
                    k = i.$,
                    h = null,
                    j = null,
                    g;
                if (!k.isIE) {
                    if (k.hasMimeType(i.mimeType)) {
                        j = k.OS != 3 ? k.findNavPlugin("QuickTime.*Plug-?in", 0) : null;
                        if (j && j.name) {
                            h = k.getNum(j.name);
                        }
                    }
                } else {
                    if (k.isStrNum(m)) {
                        g = m.split(k.splitNumRegx);
                        if (g.length > 3 && parseInt(g[3], 10) > 0) {
                            g[3] = "9999";
                        }
                        m = g.join(",");
                    }
                    if (k.isStrNum(m) && k.verIE >= i.minIEver && i.canUseIsMin() > 0) {
                        i.installed = i.isMin(m);
                        i.getVersionDone = 0;
                        return;
                    }
                    i.getVersionDone = 1;
                    if (!h && k.verIE >= i.minIEver) {
                        h = i.CDBASE2VER(k.codebaseSearch(i));
                    }
                    if (!h) {
                        j = k.getAXO(i.progID);
                        if (j && j.QuickTimeVersion) {
                            h = j.QuickTimeVersion.toString(16);
                            h = parseInt(h.charAt(0), 16) + "." + parseInt(h.charAt(1), 16) + "." + parseInt(h.charAt(2), 16);
                        }
                    }
                }
                i.installed = h ? 1 : (j ? 0 : -1);
                i.version = k.formatNum(h, 3);
            },
            cdbaseUpper: ["7,60,0,0", "0,0,0,0"],
            cdbaseLower: ["7,50,0,0", null],
            cdbase2ver: [function(f, d) {
                var e = d.split(f.$.splitNumRegx);
                return [e[0], e[1].charAt(0), e[1].charAt(1), e[2]].join(",");
            }, null],
            CDBASE2VER: function(i) {
                var j = this,
                    m = j.$,
                    g, h = j.cdbaseUpper,
                    k = j.cdbaseLower;
                if (i) {
                    i = m.formatNum(i);
                    for (g = 0; g < h.length; g++) {
                        if (h[g] && m.compareNums(i, h[g]) < 0 && k[g] && m.compareNums(i, k[g]) >= 0 && j.cdbase2ver[g]) {
                            return j.cdbase2ver[g](j, i);
                        }
                    }
                }
                return i;
            },
            canUseIsMin: function() {
                var i = this,
                    k = i.$,
                    g, m = i.canUseIsMin,
                    h = i.cdbaseUpper,
                    j = i.cdbaseLower;
                if (!m.value) {
                    m.value = -1;
                    for (g = 0; g < h.length; g++) {
                        if (h[g] && k.codebaseSearch(i, h[g])) {
                            m.value = 1;
                            break;
                        }
                        if (j[g] && k.codebaseSearch(i, j[g])) {
                            m.value = -1;
                            break;
                        }
                    }
                }
                i.SEARCH.match = m.value == 1 ? 1 : 0;
                return m.value;
            },
            isMin: function(f) {
                var d = this,
                    e = d.$;
                return e.codebaseSearch(d, f) ? 0.7 : -1;
            }
        },
        flash: {
            mimeType: ["application/x-shockwave-flash", "application/futuresplash"],
            progID: "ShockwaveFlash.ShockwaveFlash",
            classID: "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
            getVersion: function() {
                var s = function(a) {
                    if (!a) {
                        return null;
                    }
                    var b = /[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(a);
                    return b ? b[0].replace(/[rRdD\.]/g, ",").replace(/\s/g, "") : null;
                };
                var q, m = this,
                    p = m.$,
                    i, o, e = null,
                    r = null,
                    t = null;
                if (!p.isIE) {
                    q = p.findNavPlugin("Flash");
                    if (q && q.description && p.hasMimeType(m.mimeType)) {
                        e = s(q.description);
                    }
                    if (e) {
                        e = p.getPluginFileVersion(q, e);
                    }
                } else {
                    for (o = 15; o > 2; o--) {
                        r = p.getAXO(m.progID + "." + o);
                        if (r) {
                            t = o.toString();
                            break;
                        }
                    }
                    if (t == "6") {
                        try {
                            r.AllowScriptAccess = "always";
                        } catch (i) {
                            return "6,0,21,0";
                        }
                    }
                    try {
                        e = s(r.GetVariable("$version"));
                    } catch (i) {}
                    if (!e && t) {
                        e = t;
                    }
                }
                m.installed = e ? 1 : -1;
                m.version = p.formatNum(e);
                return true;
            }
        },
        shockwave: {
            mimeType: "application/x-director",
            progID: "SWCtl.SWCtl",
            classID: "clsid:166B1BCA-3F9C-11CF-8075-444553540000",
            getVersion: function() {
                var h = null,
                    e = null,
                    i, j, k = this,
                    m = k.$;
                if (!m.isIE) {
                    j = m.findNavPlugin("Shockwave\\s*for\\s*Director");
                    if (j && j.description && m.hasMimeType(k.mimeType)) {
                        h = m.getNum(j.description);
                    }
                    if (h) {
                        h = m.getPluginFileVersion(j, h);
                    }
                } else {
                    try {
                        e = m.getAXO(k.progID).ShockwaveVersion("");
                    } catch (i) {}
                    if (m.isString(e) && e.length > 0) {
                        h = m.getNum(e);
                    } else {
                        if (m.getAXO(k.progID + ".8")) {
                            h = "8";
                        } else {
                            if (m.getAXO(k.progID + ".7")) {
                                h = "7";
                            } else {
                                if (m.getAXO(k.progID + ".1")) {
                                    h = "6";
                                }
                            }
                        }
                    }
                }
                k.installed = h ? 1 : -1;
                k.version = m.formatNum(h);
            }
        },
        windowsmediaplayer: {
            mimeType: ["application/x-mplayer2", "application/asx", "application/x-ms-wmp"],
            progID: "wmplayer.ocx",
            classID: "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6",
            getVersion: function() {
                var g = this,
                    h = null,
                    j = g.$,
                    k, i = null,
                    m;
                g.installed = -1;
                if (!j.isIE) {
                    if (j.hasMimeType(g.mimeType)) {
                        i = j.findNavPlugin("Windows\\s*Media.*Plug-?in", 0, "Totem") || j.findNavPlugin("Flip4Mac.*Windows\\s*Media.*Plug-?in", 0, "Totem");
                        k = (j.isGecko && j.compareNums(j.verGecko, j.formatNum("1.8")) < 0);
                        k = k || (j.isOpera && j.verOpera < 10);
                        if (!k && j.getMimeEnabledPlugin(g.mimeType[2], "Windows\\s*Media.*Firefox.*Plug-?in")) {
                            m = j.getDOMobj(j.insertHTML("object", ["type", g.mimeType[2], "data", ""], ["src", ""], "", g));
                            if (m) {
                                h = m.versionInfo;
                            }
                        }
                    }
                } else {
                    i = j.getAXO(g.progID);
                    if (i) {
                        h = i.versionInfo;
                    }
                }
                g.installed = i && h ? 1 : (i ? 0 : -1);
                g.version = j.formatNum(h);
            }
        },
        silverlight: {
            mimeType: "application/x-silverlight",
            progID: "AgControl.AgControl",
            digits: [20, 20, 9, 12, 31],
            getVersion: function() {
                var E = this,
                    F = E.$,
                    y = document,
                    A = null,
                    G = null,
                    D = null,
                    B = true,
                    H = [1, 0, 1, 1, 1],
                    I = [1, 0, 1, 1, 1],
                    z = function(a) {
                        return (a < 10 ? "0" : "") + a.toString();
                    },
                    t = function(e, f, b, a, c) {
                        return (e + "." + f + "." + b + z(a) + z(c) + ".0");
                    },
                    s = function(b, c, a) {
                        return d(b, (c == 0 ? a : I[0]), (c == 1 ? a : I[1]), (c == 2 ? a : I[2]), (c == 3 ? a : I[3]), (c == 4 ? a : I[4]));
                    },
                    d = function(b, e, f, g, a, c) {
                        var c;
                        try {
                            return b.IsVersionSupported(t(e, f, g, a, c));
                        } catch (c) {}
                        return false;
                    };
                if (!F.isIE) {
                    var C;
                    if (F.hasMimeType(E.mimeType)) {
                        C = F.isGecko && F.compareNums(F.verGecko, F.formatNum("1.6")) <= 0;
                        if (F.isGecko && C) {
                            B = false;
                        }
                        D = F.findNavPlugin("Silverlight.*Plug-?in", 0);
                        if (D && D.description) {
                            A = F.formatNum(D.description);
                        }
                        if (A) {
                            I = A.split(F.splitNumRegx);
                            if (parseInt(I[2], 10) >= 30226 && parseInt(I[0], 10) < 2) {
                                I[0] = "2";
                            }
                            A = I.join(",");
                        }
                    }
                    E.installed = D && B && A ? 1 : (D && B ? 0 : (D ? -0.2 : -1));
                } else {
                    G = F.getAXO(E.progID);
                    var v, w, p;
                    if (G && d(G, H[0], H[1], H[2], H[3], H[4])) {
                        for (v = 0; v < E.digits.length; v++) {
                            p = I[v];
                            for (w = p + (v == 0 ? 0 : 1); w <= E.digits[v]; w++) {
                                if (s(G, v, w)) {
                                    B = true;
                                    I[v] = w;
                                } else {
                                    break;
                                }
                            }
                            if (!B) {
                                break;
                            }
                        }
                        if (B) {
                            A = t(I[0], I[1], I[2], I[3], I[4]);
                        }
                    }
                    E.installed = G && B && A ? 1 : (G && B ? 0 : (G ? -0.2 : -1));
                }
                E.version = F.formatNum(A);
            }
        },
        realplayer: {
            mimeType: ["audio/x-pn-realaudio-plugin"],
            progID: ["rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer"],
            classID: "clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA",
            INSTALLED: {},
            q1: [
                [11, 0, 0],
                [999],
                [663],
                [663],
                [663],
                [660],
                [468],
                [468],
                [468],
                [468],
                [468],
                [468],
                [431],
                [431],
                [431],
                [372],
                [180],
                [180],
                [172],
                [172],
                [167],
                [114],
                [0]
            ],
            q3: [
                [6, 0],
                [12, 99],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 69],
                [12, 46],
                [12, 46],
                [12, 46],
                [11, 3006],
                [11, 2806],
                [11, 2806],
                [11, 2804],
                [11, 2804],
                [11, 2799],
                [11, 2749],
                [11, 2700]
            ],
            compare: function(j, k) {
                var m, o = j.length,
                    a = k.length,
                    p, b;
                for (m = 0; m < Math.max(o, a); m++) {
                    p = m < o ? j[m] : 0;
                    b = m < a ? k[m] : 0;
                    if (p > b) {
                        return 1;
                    }
                    if (p < b) {
                        return -1;
                    }
                }
                return 0;
            },
            convertNum: function(t, o, p) {
                var m = this,
                    r = m.$,
                    q, s, k, j = null;
                if (!t || !(q = r.formatNum(t))) {
                    return j;
                }
                q = q.split(r.splitNumRegx);
                for (k = 0; k < q.length; k++) {
                    q[k] = parseInt(q[k], 10);
                }
                if (m.compare(q.slice(0, Math.min(o[0].length, q.length)), o[0]) != 0) {
                    return j;
                }
                s = q.length > o[0].length ? q.slice(o[0].length) : [];
                if (m.compare(s, o[1]) > 0 || m.compare(s, o[o.length - 1]) < 0) {
                    return j;
                }
                for (k = o.length - 1; k >= 1; k--) {
                    if (k == 1) {
                        break;
                    }
                    if (m.compare(o[k], s) == 0 && m.compare(o[k], o[k - 1]) == 0) {
                        break;
                    }
                    if (m.compare(s, o[k]) >= 0 && m.compare(s, o[k - 1]) < 0) {
                        break;
                    }
                }
                return p[0].join(".") + "." + p[k].join(".");
            },
            getVersion: function(z, y) {
                var C = this,
                    B = null,
                    I = 0,
                    F = 0,
                    H = C.$,
                    u, D, e, K;
                if (H.isString(y) && /[^\s]/.test(y)) {
                    K = y;
                } else {
                    y = null;
                    K = C.mimeType[0];
                }
                if (H.isDefined(C.INSTALLED[K])) {
                    C.installed = C.INSTALLED[K];
                    return;
                }
                if (!H.isIE) {
                    var A = "RealPlayer.*Plug-?in",
                        E = H.hasMimeType(C.mimeType),
                        w = H.findNavPlugin(A, 0);
                    if (E && w) {
                        I = 1;
                        if (y) {
                            if (H.getMimeEnabledPlugin(y, A)) {
                                F = 1;
                            } else {
                                F = 0;
                            }
                        } else {
                            F = 1;
                        }
                    }
                    if (C.getVersionDone !== 0) {
                        C.getVersionDone = 0;
                        if (E) {
                            var v = 1,
                                J = null,
                                p = null;
                            e = H.hasMimeType("application/vnd.rn-realplayer-javascript");
                            if (e) {
                                J = H.formatNum(H.getNum(e.enabledPlugin.description));
                            }
                            if (H.OS == 1 && J) {
                                var G = J.split(H.splitNumRegx);
                                p = true;
                                if (C.compare(G, [6, 0, 12, 200]) < 0) {
                                    p = false;
                                } else {
                                    if (C.compare(G, [6, 0, 12, 1739]) <= 0 && C.compare(G, [6, 0, 12, 857]) >= 0) {
                                        p = false;
                                    }
                                }
                            }
                            if (p === false) {
                                v = 0;
                            }
                            if (H.OS <= 2) {
                                if (H.isGecko && H.compareNums(H.verGecko, H.formatNum("1,8")) < 0) {
                                    v = 0;
                                }
                                if (H.isChrome) {
                                    v = 0;
                                }
                                if (H.isOpera && H.verOpera < 10) {
                                    v = 0;
                                }
                            } else {
                                v = 0;
                            }
                            if (v) {
                                e = H.insertHTML("object", ["type", C.mimeType[0]], ["src", "", "autostart", "false", "imagestatus", "false", "controls", "stopbutton"], "", C);
                                e = H.getDOMobj(e);
                                try {
                                    B = H.getNum(e.GetVersionInfo());
                                } catch (u) {}
                                H.setStyle(e, ["display", "none"]);
                            }
                            if (!B && J && p === false) {
                                e = C.convertNum(J, C.q3, C.q1);
                                B = e ? e : J;
                            }
                        }
                    } else {
                        B = C.version;
                    }
                    C.installed = I && F && B ? 1 : (I && F ? 0 : (I ? -0.2 : -1));
                } else {
                    e = null;
                    for (D = 0; D < C.progID.length; D++) {
                        e = H.getAXO(C.progID[D]);
                        if (e) {
                            try {
                                B = H.getNum(e.GetVersionInfo());
                                break;
                            } catch (u) {}
                        }
                    }
                    C.installed = B ? 1 : -1;
                }
                if (!C.version) {
                    C.version = H.formatNum(B);
                }
                C.INSTALLED[K] = C.installed;
            }
        },
        zz: 0
    };
    PluginDetect.initScript();
    return _;
}
