var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var del = require("del");
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();

var fs = require('fs');

let loadABI = (file) => {
    var jsonABI = fs.readFileSync(__dirname + '/abi/'+file+'.json');
    jsonABI = jsonABI.toString().trim().replace(/(?:\r\n|\r|\n|\t)/g, '');
    jsonABI = JSON.stringify(jsonABI);
    return jsonABI;
}

// Task which would transpile typescript to javascript
gulp.task("typescript", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

// Task which would delete the old dist directory if present
gulp.task("build-clean", function () {
    return del(["./dist"]);
});

// Task which would just create a copy of the current views directory in dist directory
gulp.task("datajson", function () {
    return gulp.src("./src/*.json").pipe(gulp.dest("./dist"));
});

// Task which would just create a copy of the current views directory in dist directory
gulp.task("views", function () {
    return gulp.src("./src/views/**/*.html").pipe(gulp.dest("./dist/views"));
});

// Task which would just create a copy of the current views directory in dist directory
gulp.task("admin", function () {
    return gulp.src("./src/admin/**/*.html").pipe(gulp.dest("./dist/admin"));
});

// Task which would just create a copy of the current static assets directory in dist directory
gulp.task("assets", function () {
    return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/public/assets"));
});

gulp.task('web3', function() {
    
    gulp.src([
           // 'node_modules/socket.io/client-dist/socket.io.js',
            'node_modules/web3/dist/web3.min.js',
            'node_modules/moment/moment.js',
            'node_modules/axios/dist/axios.js',
        ])
        .pipe(concat('web3.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("./dist/public/assets/js"))
        .pipe(browserSync.stream());

    
    gulp.src([
            
            'node_modules/web3modal/dist/index.js',
            'node_modules/evm-chains/dist/umd/index.min.js',
            'node_modules/@walletconnect/web3-provider/dist/umd/index.min.js',
            'node_modules/fortmatic/dist/fortmatic.js',
        ])
        .pipe(concat('provider.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("./dist/public/assets/js"))
        .pipe(browserSync.stream());

    gulp.src(['./src/public/blockchain/blockchain.js'])
            .pipe(concat('blockchain.js'))
            //.pipe(uglify())
            .pipe(gulp.dest("./dist/public/assets/js"))
            .pipe(browserSync.stream());

    return gulp.src([
            './src/public/blockchain/token.js',
            './src/public/blockchain/nftmarket.js',
            './src/public/blockchain/marketplace.js',
            './src/public/blockchain/nfttravel.js'
            
            //'dev/blockchain_dev.js',
            //'dev/token.js',
            //'dev/airdrop.js',
            //'dev/presell.js',
            //'dev/ido.js',
            //'dev/farm.js',
            //'dev/client.js'
        ])
        .pipe(replace(/{token_abi}/g, loadABI("token")))
        .pipe(replace(/{token_address}/g, "0x9e29E268b20EB1d7930278e49e8c26511A40FE30"))
        .pipe(replace(/{nftfactory_abi}/g, loadABI("nftfactory")))
        .pipe(replace(/{nftfactory_address}/g, "0x23f5ba792324925d89e866ff1814a95649478037"))
        .pipe(replace(/{nfttravel_abi}/g, loadABI("nfttravel")))
        .pipe(replace(/{nfttravel_address}/g, "0xf48d81d49c4f68dcf109d217319e02108971d7cc"))
        //.pipe(concat('./dist/provider.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("./dist/public/assets/js"))
        .pipe(browserSync.stream());
    
});


// The default task which runs at start of the gulpfile.js
gulp.task("default", gulp.series("typescript", "views","admin", "assets", "web3","datajson"), () => {
    console.log("Done");
});
gulp.task("defaultadmin", gulp.series("typescript", "admin", "assets","datajson"), () => {
    console.log("Done Make Admin");
});
gulp.task("defaultapi", gulp.series("typescript"), () => {
    console.log("Done Make Api");
});