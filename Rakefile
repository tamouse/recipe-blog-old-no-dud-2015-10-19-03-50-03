require "rubygems"
require "bundler/setup"
require 'highline/import'
require "stringex"
require "open-uri"
require "nokogiri"
require "pandoc-ruby"

# Stolen liberally from octopress

jekyll_config   = YAML.load(File.read("_config.yml"))

source_dir      = jekyll_config.delete("source")
source_dir      ||= "source"

destination_dir = jekyll_config.delete("destination")
destination_dir ||= "public"

deployment_branch = "gh-pages"
deployment_dir  = "gh-pages"
deployment_remote = "origin"

posts_dir       = "_posts"

editor          = ENV['VISUAL'] ||= ENV['EDITOR'] ||= nil
new_post_ext    = "markdown"
new_page_ext    = "markdown"

NON_URL_CHARS   = %r{[^-.\/[:alnum:]]}

def create_slug(title)
  title.to_url.gsub(NON_URL_CHARS,'')
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
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "category: #{args.category}"
    post.puts "tags: []"
    post.puts "---"
    post.puts "\n<div class=\"excerpt\">\n\n</div>\n\n"
  end
  system("#{editor} #{filename}") unless editor.nil?
end

# Stolen liberally from the jekyll repo

desc "Generate and view the site locally"
task :preview do

  # Generate the site in server mode.
  puts "Running Jekyll..."
  sh "bin/jekyll serve --baseurl='' --watch"

end

desc "Generate the site"
task :generate do
  puts "Running Jekyll..."
  sh "bin/jekyll build --baseurl=''"
end

desc "Commit the local site to the gh-pages branch and publish to GitHub Pages"
task :publish do
  # Ensure the gh-pages dir exists so we can generate into it.
  puts "Checking for #{deployment_dir}..."
  unless File.exist?(deployment_dir)
    puts "No #{deployment_dir} directory found."
    exit(1)
  end

  # Generate the site with the gh-pages as the destination
  puts "Generating site into #{deployment_dir}..."
  sh "bin/jekyll build --destination='#{deployment_dir}'"

  # Commit and push.
  puts "Committing and pushing to GitHub Pages..."
  Dir.chdir(deployment_dir) do
    sh "git add --all"
    sh "git commit --allow-empty -m 'Published at #{Time.now.to_s}'"
    sh "git push --force #{deployment_remote} #{deployment_branch}"
  end
  puts 'Done.'
end



