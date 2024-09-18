import dotconfig from '@dotenvx/dotenvx'
import { deleteAsync } from 'del'
import fs from 'fs'
import { dest, series, src, watch } from 'gulp'
import eslint from 'gulp-eslint-new'
import ts from 'gulp-typescript'

dotconfig.config()

// console.log(process.env)

/**
 * Different paths we use...
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
 * Configure the ts transpilation
 */
const tsProject = ts.createProject('tsconfig.json')

function build_ts() {
    return tsProject.src()
        .pipe(eslint())
        .pipe(eslint.failAfterError())
        .pipe(tsProject())
        .js.pipe(dest(paths.dist))
}

function copy_package() {
    return src([paths.src + '/package.json'])
        .pipe(dest(paths.dist))
}

/**
 * Build the project, copy the appropriate files over
 */
export const build = series(build_ts, copy_package)

/**
 * Copy the files from dist into ACARS_SCRIPTS_PATH
 *
 */
export function copy() {
    console.log(`Copying files to ${paths.acars}`)

    return src(['./**/*', '!node_modules/**/*'], { 'cwd': paths.dist })
        .pipe(dest(paths.acars))
}

/**
 * The build steps that run from the csproj
 * Force the output path to go into our build directory
 */
export const csbuild = series(
    async () => {
        paths.acars = '../Content/config/default'
    },
    build,
    copy,
)

/**
 * TODO: Build the distribution zip file
 */
function build_dist() {

}

/**
 * Build a distribution zip file, which can be easily uploaded
 */
export const dist = series(
    build,
    build_dist,
)

/**
 * Watch the src folder for updates, compile them and then copy them
 * to the config directory. ACARS should auto-reload
 */
export async function testing() {
    watch('src/', {
        ignoreInitial: false,
        delay: 500,
    }, series(build, copy))
}

/**
 * Watch the files and distribute them out
 */
export function watchFiles() {
    watch('src/', build)
}

export { watchFiles as watch }

/**
 * Clean up the /dest directory
 */
export async function clean() {
    try {
        if (await fs.promises.exists(paths.dist)) {
            await deleteAsync([paths.dist])
            await Promise.resolve()
        }
    } catch (e) {
        console.log(e)
    }
}

/**
 * The default action
 */
export default build

/**
 * Get the default profile name
 *
 * @returns {*}
 */
/*async function getDefaultProfilePath() {
    if (profileName === null || profileName === '') {
        const f = await fs.promises.readFile(`${paths.acars}/settings.json`)
        const settings = JSON.parse(f)
        profileName = settings.Profile
        console.log('No profile name set, looked in settings and used ' + profileName)
    }

    // Read all of the profiles
    let dirent
    const dir = await fs.promises.opendir(`${paths.acars}/profiles`)
    for await (const dirent of dir) {
        const pf = await fs.promises.readFile(`${dirent.parentPath}/${dirent.name}`)
        if (pf === null) {
            continue
        }

        const profile = JSON.parse(pf)
        console.log(profile)

        if (profile.Name === profileName) {
            return `${paths.acars}/data/${profile.Domain}/config/`
        }
    }

    return null
}*/
