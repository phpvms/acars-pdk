import dotconfig from '@dotenvx/dotenvx'
import { deleteAsync } from 'del'
import { dest, series, src, watch } from 'gulp'
import eslint from 'gulp-eslint-new'
import ts from 'gulp-typescript'
import prettier from 'gulp-prettier'
import minify from 'gulp-minify'

dotconfig.config()

/**
 * Different paths we use...
 * Don't modify this directly, use the environment variables
 */
const paths = {
  src: './src',
  dist: './dist',

  /**
   * ACARS scripts/config directory. This, by default, points to the home directory
   * But you can change this to point to a local directory
   */
  acars: process.env.ACARS_SCRIPTS_PATH,
}

/**
 * Build the project, copy the appropriate files over
 * @public
 */
export const build = series(buildTsTask, copyPackageTask)

/**
 * Build a distribution zip file, which can be easily uploaded
 * @public
 */
export const dist = series(
  build,
  buildZipTask,
)

/**
 * Watch the files and distribute them to the
 * documents/vmsacars/data/<profile>/config directory
 * @public
 */
export const local = localTask


/**
 * The default action
 * @default
 * @public
 */
export default build


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
  copyFilesToScriptsPathTask,
)

/**
 *
 *
 *
 */

/**
 * Configure the ts transpilation
 */
const tsProject = ts.createProject('tsconfig.json')

/**
 * Build the Typescript files
 * @returns {module:stream.Stream.Transform | *}
 */
async function buildTsTask() {
  let pipeline = tsProject.src()
    .pipe(eslint())
    .pipe(eslint.failAfterError())
    .pipe(tsProject())
    .js
    .pipe(prettier())

  // Minify/mangle output
  /*
  pipeline = pipeline.pipe(minify({
    mangle: false,
  }))*/

  pipeline = pipeline
    .pipe(dest(paths.dist))

  return pipeline
}

/**
 *
 * @returns {*}
 */
async function copyPackageTask() {
  return src([paths.src + '/package.json'])
    .pipe(dest(paths.dist))
}

/**
 * Copy the files from dist into ACARS_SCRIPTS_PATH
 *
 */
export async function copyFilesToScriptsPathTask() {
  console.log(`Copying files to ${paths.acars}`)

  return src(
    [
      './**/*',
      '!node_modules/**/*',
    ],
    { 'cwd': paths.dist },
  )
    .pipe(dest(paths.acars))
}


/**
 * TODO: Build the distribution zip file
 */
function buildZipTask() {

}


/**
 * Watch the src folder for updates, compile them and then copy them
 * to the config directory. ACARS should auto-reload
 */
export async function testingTask() {
  watch('src/', {
    ignoreInitial: false,
    delay: 500,
  }, series(build, copyFilesToScriptsPathTask))
}

/**
 * Watch the files and then build and copy them to the documents directory
 */
export async function localTask() {
  return watch('src/', { ignoreInitial: false }, series(build, copyFilesToScriptsPathTask), function() {
    cb()
  })
}

/**
 * Clean up the /dest directory
 */
export async function cleanTask() {
  try {
    await deleteAsync([paths.dist])
    await Promise.resolve()
  } catch (e) {
    console.log(e)
  }
}
