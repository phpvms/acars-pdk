import dotconfig from '@dotenvx/dotenvx'
import { deleteAsync } from 'del'
import { dest, series, src, watch } from 'gulp'
import eslint from 'gulp-eslint-new'
import rsync from 'gulp-rsync'
import ts from 'gulp-typescript'
import merge2 from 'merge2'

dotconfig.config()


/**
 * Different paths we use...
 */
const paths = {
    src: 'src',
    dest: 'dist',

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

/**
 * Build the project, copy the appropriate files over
 */
export async function build() {
    return merge2(
        // Build the TS files
        tsProject.src()
            .pipe(eslint())
            .pipe(eslint.failAfterError())
            .pipe(tsProject())
            .js.pipe(dest(paths.dest)),


        // Copy the package json file over
        src([paths.src + '/package.json']).pipe(dest(paths.dest)),
    )
}

/**
 * Copy the files from dist into ACARS_SCRIPTS_PATH
 *
 * @returns {Promise<void>}
 */
export async function copy() {
    console.log(`Copying files to ${paths.acars}`)
    return src([paths.dest + '/**/*']).pipe(dest(paths.acars))
}

/**
 * Build a distribution zip file, which can be easily uploaded
 */
export function dist() {

}

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
    await deleteAsync([paths.dest])
}

/**
 * Internal task to copy files over to the PDK distribution
 * @returns {Promise<void>}
 */
export async function pdk() {
    const source = '.'
    const pdk_path = process.env.PDK_DISTRIBUTION_DIRECTORY

    const files = [
        `${source}/**/*`,
        `!${source}/bin`,
        `!${source}/dist`,
        `!${source}/node_modules`,
        `!${source}/obj`,
        `!${source}/.env`,
        `!${source}/nuget.config`,
        `!${source}/Content.Source.*`,
    ]

    src([source]).pipe(rsync({
        root: '.',
        destination: pdk_path,
        recursive: true,
        exclude: [
            `${source}/bin`,
            `${source}/dist`,
            `${source}/node_modules`,
            `${source}/obj`,
            `${source}/.env`,
            `${source}/nuget.config`,
            `${source}/Content.Source.*`,
        ],
    }))

    /*const deleteFiles = [
        `${pdk_path}/dist`,
        `${pdk_path}/node_modules`,
        `!${pdk_path}/src/aircraft/Example.ts`,
        `!${pdk_path}/src/rules/example.ts`,
    ]

    await deleteAsync(deleteFiles, {
        force: true,
    })*/
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
