task :css do
  sh 'compass compile . _sass/git-tfs.scss'
end

jekyll_command = 'jekyll --pygments --no-lsi --safe'

desc "Build the site"
task :site => :css do
  sh jekyll_command
end

desc "Build the site and start a local server."
task :serve => :css do
  sh "#{jekyll_command} --server"
end

task :default => :site
