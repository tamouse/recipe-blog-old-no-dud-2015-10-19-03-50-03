require 'highline/import'
require "stringex_lite"
require 'yaml'
require 'erb'
require 'awesome_print'

# Stolen liberally from octopress

jekyll_config   = YAML.load(ERB.new(File.read("_config.yml")).result)

DEFAULT_DEPLOYMENT_DIR    = "_deploy"
DEFAULT_DEPLOYMENT_BRANCH = "master"
DEFAULT_DEPLOYMENT_REMOTE = "origin"

source_dir      = jekyll_config.fetch("source","source")
destination_dir = jekyll_config.fetch("destination","destination")
deployment      = jekyll_config.fetch("deployment", {"directory" => DEFAULT_DEPLOYMENT_DIR, "branch" => DEFAULT_DEPLOYMENT_BRANCH, "remote" => DEFAULT_DEPLOYMENT_REMOTE })
deployment_dir  = deployment.fetch("directory", DEFAULT_DEPLOYMENT_DIR)
deployment_remote = deployment.fetch("remote", DEFAULT_DEPLOYMENT_REMOTE)
deployment_branch = deployment.fetch("branch", DEFAULT_DEPLOYMENT_BRANCH)
posts_dir       = jekyll_config.fetch("posts", "_posts")
markdown_ext    = jekyll_config.fetch("markdown_ext", "markdown")
new_post_ext    = markdown_ext.split(',').first.strip || "markdown"

editor          = ENV['VISUAL'] ||= ENV['EDITOR'] ||= nil
editor_parms    = '-n'

config = {
  "source_dir" => source_dir,
  "destination_dir" => destination_dir,
  "deployment" => deployment,
  "deployment_dir" => deployment_dir,
  "deployment_remote" => deployment_remote,
  "deployment_branch" => deployment_branch,
  "posts_dir" => posts_dir,
  "markdown_ext" => markdown_ext,
  "new_post_ext" => new_post_ext,
  "editor" => editor,
  "editor_parms" => editor_parms
}

hl = HighLine.new

NON_URL_CHARS   = %r{[^-.\/[:alnum:]]}

def create_slug(title)
  title.to_url.gsub(NON_URL_CHARS,'')
end

task :default do |t|
  hl.say "SETTINGS:\n"
  hl.say "Jekyll Config:"
  hl.indent do
    ap jekyll_config
  end
  hl.say "Rake Config:"
  hl.indent do
    ap config
  end
end



desc "Begin a new recipe in #{source_dir}/#{posts_dir}"
task :new_recipe, :title, :category do |t, args|
  raise "### You haven't set anything up yet. You need to create a source directory" unless File.directory?(source_dir)
  if args.title
    title = args.title
  else
    title = ask("Recipe Name? ") {|q| q.default="New Recipe"}
  end
  if args.category
    category = args.category
  else
    category = ask("Recipe Category? ") {|q| q.default="Misc"}
  end
  
  mkdir_p File.join(source_dir, posts_dir)
  filename = File.join(source_dir,posts_dir,"#{Time.now.strftime('%Y-%m-%d')}-#{create_slug(title)}.#{new_post_ext}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  say "<%= color('Creating new post:', :yellow) %> <%= color('#{filename}', :red) %>"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "category: #{args.category}"
    post.puts "tags: []"
    post.puts "external_url: "
    post.puts "---"
    post.puts "\n<div class=\"excerpt\">\n\n</div>\n\n"
  end
  system("#{editor} #{editor_parms} #{filename}") unless editor.nil?
end

# Stolen liberally from the jekyll repo

desc "Generate and view the site locally"
task :preview do

  # Generate the site in server mode.
  say "<%= color('Running Jekyll server...', :yellow) %>"
  sh "jekyll serve --baseurl='' --watch"

end

desc "Generate the site"
task :generate do
  say "<%= color('Building site into ', :yellow) %> <%= color('#{destination_dir}', :cyan) %>"
  sh "jekyll build --baseurl=''"
end

desc "Commit the local site to the gh-pages branch and publish to GitHub Pages"
task :publish do
  # Ensure the gh-pages dir exists so we can generate into it.
  abort "No #{deployment_dir} directory found." unless File.exist?(deployment_dir)

  # Generate the site with the gh-pages as the destination
  say "<%= color('Generating site into ', :yellow) %> <%= color('#{deployment_dir}', :cyan) %>"
  sh "jekyll build --destination='#{deployment_dir}'"

  # Commit and push.
  say "<%= color('Committing and pushing to GitHub Pages...', :yellow) %>"
  Dir.chdir(deployment_dir) do
    sh "git checkout #{deployment_branch}"
    sh "git add --all"
    sh "git commit --allow-empty -m 'Published at #{Time.now.to_s}'"
    sh "git push --force #{deployment_remote} HEAD"
  end
  say "<%= color('Done.', :yellow) %>"
end
