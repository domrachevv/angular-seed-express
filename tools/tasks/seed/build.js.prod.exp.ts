import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */

export = () => {
  let tsProject = makeTsProject();
  let src = [
    Config.TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(Config.TMP_CLIENT_DIR, '**/*.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.typescript(tsProject))
    .once('error', function(e: any) {
      this.once('finish', () => process.exit(1));
    });


  return result.js
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(Config.TMP_CLIENT_DIR))
    .on('error', (e: any) => {
      console.log(e);
    });
};
