use std::error::Error;

#[derive(Debug)]
pub struct Exception {
	message: String,
	source: Option<Box<dyn Error>>
}
impl std::fmt::Display for Exception {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match write!(f, "MyError: {}", self.message) { Ok(_) => (), Err(err) => return Err(err) };
		let mut current = self.source();
		while let Some(err) = current {
			match write!(f, "\nCaused by: {}", err) { Ok(_) => (), Err(err) => return Err(err) };
			current = err.source();
		}
		Ok(())
	}
}
// impl std::fmt::Debug for Exception {
// 	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
// 		match write!(f, "MyError: {}", self.message) { Ok(_) => (), Err(err) => return Err(err) };
// 		let mut current = self.source();
// 		while let Some(err) = current {
// 			match write!(f, "\nCaused by: {}", err) { Ok(_) => (), Err(err) => return Err(err) };
// 			current = err.source();
// 		}
// 		Ok(())
// 	}
// }
impl Error for Exception {
	fn source(&self) -> Option<&(dyn Error + 'static)> {
		match &self.source {
			Some(err) => Some(err.as_ref()),
			None => None
		}
	}
}
impl Exception {
	
	pub fn new (message: String) -> Self {
		Exception {
			message: message.into(),
			source: None
		}
	}
	
	pub fn with_source (message: String, source: Box<dyn Error>) -> Self {
		Exception {
			message: message.into(),
			source: Some(source)
		}
	}
	
}
