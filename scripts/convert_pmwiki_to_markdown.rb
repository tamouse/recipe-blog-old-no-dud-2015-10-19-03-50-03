#!/usr/bin/env ruby
require 'fileutils'
require "stringex_lite"


def convert_text_to_body(line)
  line.gsub("%3c",'<').gsub("%0a","\n").gsub("%25",'%')
end

def convert_pmwiki_to_markdown(body)
  body.split("\n").map do |line|
    begin
      line.
        gsub(/{\$DegF}/,"&degF;").gsub(/{\$DegC}/,"&degC").gsub(/^#/,'1. ').
        gsub(/^!!!/,'### ').gsub(/^!!/,'## ').gsub(/^!/,'# ').
        gsub(/'''''/,'**').gsub(/'''/,'**').gsub(/''/,'*')
    rescue => e
      $stderr.puts "#{e.class}: #{e}"
      $stderr.puts "line has some problems: #{line.inspect}"
      line
    end
  end.join("\n")
end

def postname(content)
  "#{content['date'].strftime("%Y-%m-%d")}-#{content['name'].to_url}.markdown"
rescue => e
  $stderr.puts "Problem with file #{content['filename']}: #{e}"
  $stderr.puts "date: #{content['date']}"
end

def scrub(string)
  content = ''
  string.each_char do |c|
    if c.valid_encoding?
      content << c
    else
      content << "!*!*!*!*!"
    end
  end
  content
end


filename = ARGV.shift
print "Converting file #{filename} "
content = {'filename' => filename}

doc = File.open(filename, "r:ISO-8859-1:UTF-8") {|f| f.read }

scrub(doc).split("\n").each do |line|
  line.chomp!
  content['date'] = Time.at(line.match(/^ctime=(\d+)/)[1].to_i) if line =~ /^ctime=/
  content['name']  = line.rpartition('.').last.gsub(/([A-Z])/,' \1').sub(/^ /,'') if line =~ /^name=/
  content['body']  = convert_pmwiki_to_markdown(scrub(convert_text_to_body(line.partition('=').last))) if line =~ /^text=/
end

File.open(postname(content),'w') do |post|
  post.puts '---'
  post.puts 'layout: post'
  post.puts "title: \"#{content['name']}\""
  post.puts "date: #{content['date']}"
  post.puts "categories: []"
  post.puts "tags: []"
  post.puts "external_url: "
  post.puts '---'
  post.write(content['body'])
  post.puts
end

  
puts " done"
