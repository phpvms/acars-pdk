import dotconfig from '@dotenvx/dotenvx'
import { deleteSync as del } from 'del'
import fs from 'fs'
import { dest, series, src, watch } from 'gulp'
import eslint from 'gulp-eslint-new'
import prettier from 'gulp-prettier'
import ts from 'gulp-typescript'
import zip from 'gulp-zip'

dotconfig.config()

/**
 * Different paths we use...
 * Don't modify this directly, use the environment variables
 */
const paths = {
  /**
   * ACARS scripts/config directory. This, by default, points to the home directory
   * But you can change this to point to a local directory
   */
  acars: process.env.ACARS_SCRIPTS_PATH,

  src: './src',
  out: './dist',
  export: './dist',
}

/**
 * Build the project, copy the appropriate files over
 * @public
 */
export const build = series(buildTsTask, copyPackageJsonTask)

/**
 * Clean the build directories
 * @public
 */
export const clean = cleanTask

/**
 * Build a distribution zip file, which can be easily uploaded
 * @public
 */
export const dist = series(clean, build, buildZipTask)

/**
 * Watch the files and distribute them to the
 * documents/vmsacars/data/<profile>/config directory
 * @public
 */
export const dev = localBuildTask

/**
 * The build steps that run from the csproj
 * Force the output path to go into our build directory
 * @internal
 */
export const csbuild = series(
  async () => {
    paths.acars = '../Content/config/default'
  },
  build,
  copyFilesToAcarsPathTask,
)

/**
 * The default action
 * @default
 * @public
 */
export default build

/**
 *
 *
 *
 */

/**
 * Configure the ts transpilation
 *
 */
const tsProject = ts.createProject('tsconfig.json')

/**
 * Build the Typescript files
 */
function buildTsTask() {
  // ensure the dist directory exists
  if (!fs.existsSync(paths.out)) {
    fs.mkdirSync(paths.out)
  }

  let pipeline = tsProject
    .src()
    .pipe(eslint())
    .pipe(eslint.failAfterError())
    .pipe(tsProject())
    .js.pipe(prettier())
    .pipe(dest(paths.out))

  // Minify/mangle output
  /*
  pipeline = pipeline.pipe(minify({
    mangle: false,
  }))*/

  return pipeline
}

/**
 * This copies the package.json file to the output directory
 *
 */
function copyPackageJsonTask() {
  return src([paths.src + '/package.json']).pipe(dest(paths.out))
}

/**
 * Copy the files from dist into ACARS_SCRIPTS_PATH
 */
function copyFilesToAcarsPathTask() {
  console.log(`Copying files to ${paths.acars}`)

  return src(['./**/*', '!node_modules/**/*'], { cwd: paths.out }).pipe(
    dest(paths.acars),
  )
}

/**
 * Build the zip that should get uploaded
 */
function buildZipTask() {
  console.log('Writing zip named ' + process.env.ACARS_DIST_ZIP)
  if (!fs.existsSync(paths.export)) {
    fs.mkdirSync(paths.export)
  }

  return (
    src(paths.out + '/**/*', { base: paths.out })
      /*.pipe(tap(function (file) {
      console.log('file: ' + file.path)
    }))*/
      .pipe(zip(process.env.ACARS_DIST_ZIP, { buffer: true }))
      .pipe(dest(paths.export))
  )
}

/**
 * Watch the files and then build and copy them to the documents directory
 */
function localBuildTask() {
  return watch(
    paths.src,
    { ignoreInitial: false },
    series(build, copyFilesToAcarsPathTask),
  )
}

/**
 * Clean up the /dest directory
 */
async function cleanTask() {
  return del([paths.out, paths.export + '/' + process.env.ACARS_DIST_ZIP])
}

/**
 * Copy the PDK files to the PDK and config repos
 * @internal
 * @returns {Promise<void>}
 */
function updatePdk() {
  if (!process.env.PDK_DEST || !process.env.CFG_DEST) {
    console.error('PDK_DEST and CFG_DEST must be set')
    return
  }
}
