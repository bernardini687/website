# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) { |repo| "https://github.com/#{repo}" }

# Matches what GitHub Pages builds with; pins jekyll and its plugin set.
gem 'github-pages', group: :jekyll_plugins

# ponytail: jekyll 3.x doesn't depend on webrick, and ruby 3 dropped it from
# stdlib — `jekyll serve` needs it explicitly.
gem 'webrick', '~> 1.9'
